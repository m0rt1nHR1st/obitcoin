import { Injectable } from '@angular/core';

import { Member } from './member';
import { Pool } from './pool';

declare var web3: any;

@Injectable()

export class contractintegration{
	accounts: any[];
	account: any;
	contractAbi: any;
	contractCompiled: any;
	contractGas: any;
	connected: any;
	initialized: any;
	lastBlockNumber: any;
	self: any;

	Obitcoin: any;

	constructor(){
		this.accounts = [];
		this.account = "";

		this.contractAbi = [{"constant":true,"inputs":[{"name":"pool","type":"uint16"}],"name":"getMembersBalance","outputs":[{"name":"","type":"uint128[]"},{"name":"","type":"uint128[]"},{"name":"","type":"uint16[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"pool","type":"uint16"}],"name":"getPoolData","outputs":[{"name":"","type":"bytes16[3]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"pools","type":"uint16[]"},{"name":"members","type":"uint16[]"},{"name":"amount","type":"uint128[]"}],"name":"sendTokensBulk","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"member","type":"uint16"}],"name":"getMemberDetails","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"address"},{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPublishingBlockNumber","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"member","type":"uint16"},{"name":"name","type":"bytes32"},{"name":"adr","type":"address"},{"name":"isAdmin","type":"bool"}],"name":"updateMember","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint16"},{"name":"admin","type":"bool"}],"name":"setAdmin","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPools","outputs":[{"name":"","type":"uint16[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"pool","type":"uint16"}],"name":"getPoolParticipants","outputs":[{"name":"","type":"uint16[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPoolCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"pool","type":"uint16"},{"name":"member","type":"uint16"},{"name":"amount","type":"uint128"}],"name":"sendTokens","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getMembers","outputs":[{"name":"","type":"uint16[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes16"},{"name":"legalContract","type":"bytes16"},{"name":"financialReports","type":"bytes16"}],"name":"createDebtPool","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"pool","type":"uint16"},{"name":"member","type":"uint16"}],"name":"getMemberBalance","outputs":[{"name":"","type":"uint128[2]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"pool","type":"uint16"},{"name":"name","type":"bytes16"},{"name":"legalContract","type":"bytes16"},{"name":"financialReports","type":"bytes16"}],"name":"updateDebtPool","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"},{"name":"adr","type":"address"},{"name":"isAdmin","type":"bool"}],"name":"addMember","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"pool","type":"uint16"},{"name":"amount","type":"uint128"}],"name":"buyTokens","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"uint16"},{"indexed":true,"name":"to","type":"uint16"},{"indexed":true,"name":"pool","type":"uint16"},{"indexed":false,"name":"amount","type":"int256"},{"indexed":false,"name":"time","type":"uint256"}],"name":"TokenTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"uint16"},{"indexed":true,"name":"to","type":"uint16"},{"indexed":true,"name":"pool","type":"uint16"},{"indexed":false,"name":"amount","type":"uint128"},{"indexed":false,"name":"time","type":"uint256"}],"name":"SliceTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"uint16"},{"indexed":true,"name":"pool","type":"uint16"},{"indexed":false,"name":"amount","type":"uint128"},{"indexed":false,"name":"time","type":"uint256"}],"name":"TokenPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"uint16"},{"indexed":true,"name":"pool","type":"uint16"},{"indexed":false,"name":"added","type":"bool"},{"indexed":false,"name":"time","type":"uint256"}],"name":"PoolChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"uint16"},{"indexed":true,"name":"fromAddress","type":"address"},{"indexed":false,"name":"time","type":"uint256"}],"name":"UnauthorizedAccess","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"uint16"},{"indexed":true,"name":"to","type":"uint16"},{"indexed":false,"name":"added","type":"bool"},{"indexed":false,"name":"time","type":"uint256"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"uint16"},{"indexed":true,"name":"to","type":"uint16"},{"indexed":false,"name":"added","type":"bool"},{"indexed":false,"name":"time","type":"uint256"}],"name":"PersonChanged","type":"event"}];

		this.contractCompiled = '606060405234156200000d57fe5b5b60008054600160a060020a03191633600160a060020a0316908117909155600680546201000067ffffffff00000000199091166401000000004363ffffffff16021761ffff191660011763ffff00001916179055604080516080810182527f4f776e657200000000000000000000000000000000000000000000000000000081526020810192909252810160035b81526001602091820181905260065461ffff16600090815281835260409081902084518155928401519183018054600160a060020a031916600160a060020a039093169290921780835590840151919060a060020a60ff021916740100000000000000000000000000000000000000008360038111156200011957fe5b0217905550606091909101516001918201805491151575010000000000000000000000000000000000000000000260a860020a60ff021990921691909117905560028054909181016200016d8382620001e6565b91600052602060002090601091828204019190066002025b60068054835461ffff6101009490940a848102199091169184160217909255815433600160a060020a03166000908152600560205260409020805491831661ffff199283161790558254908116908216600101909116179055505b62000247565b8154818355818115116200021d57600f016010900481600f016010900483600052602060002091820191016200021d919062000223565b5b505050565b6200024491905b808211156200024057600081556001016200022a565b5090565b90565b61293c80620002576000396000f300606060405236156100e05763ffffffff60e060020a60003504166304a385e581146100e257806305790c08146101f657806323453e2d1461024a57806332a2c5d01461030f57806338c5e15a1461033b578063438a5f131461038d57806357091c81146103b65780635fd42e4d146103e3578063673a2a1f146104015780636d8171301461046c5780638eec5d70146104de5780639a59b749146105005780639eab52531461052b578063a5f9755414610596578063a97bd3fe146105c1578063cee11e961461061d578063e1669f171461064f578063f3fa89df14610675575bfe5b34156100ea57fe5b6100f961ffff6004351661069a565b6040518080602001806020018060200184810384528781815181526020019150805190602001906020028083836000831461014f575b80518252602083111561014f57601f19909201916020918201910161012f565b5050509190910185810384528751815287516020918201925081890191028083838215610197575b80518252602083111561019757601f199092019160209182019101610177565b50505091909101858103835286518152865160209182019250818801910280838382156101df575b8051825260208311156101df57601f1990920191602091820191016101bf565b505050905001965050505050505060405180910390f35b34156101fe57fe5b61020d61ffff60043516610957565b604051808260608083835b80518252602083111561023857601f199092019160209182019101610218565b50505090500191505060405180910390f35b341561025257fe5b61030d600480803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843750506040805187358901803560208181028481018201909552818452989a998901989297509082019550935083925085019084908082843750506040805187358901803560208181028481018201909552818452989a9989019892975090820195509350839250850190849080828437509496506109e095505050505050565b005b341561031757fe5b61031f610abc565b60408051600160a060020a039092168252519081900360200190f35b341561034357fe5b61035261ffff60043516610ac1565b60408051848152600160a060020a038416602082015290810182600381111561037757fe5b60ff168152602001935050505060405180910390f35b341561039557fe5b61039d610b2c565b6040805163ffffffff9092168252519081900360200190f35b34156103be57fe5b61030d61ffff60043516602435600160a060020a03604435166064351515610b41565b005b34156103eb57fe5b61030d61ffff600435166024351515610dab565b005b341561040957fe5b610411610f53565b6040805160208082528351818301528351919283929083019185810191028083838215610459575b80518252602083111561045957601f199092019160209182019101610439565b5050509050019250505060405180910390f35b341561047457fe5b61041161ffff60043516610fda565b6040805160208082528351818301528351919283929083019185810191028083838215610459575b80518252602083111561045957601f199092019160209182019101610439565b5050509050019250505060405180910390f35b34156104e657fe5b6104ee611098565b60408051918252519081900360200190f35b341561050857fe5b61030d61ffff600435811690602435166001608060020a036044351661109f565b005b341561053357fe5b61041161143a565b6040805160208082528351818301528351919283929083019185810191028083838215610459575b80518252602083111561045957601f199092019160209182019101610439565b5050509050019250505060405180910390f35b341561059e57fe5b61030d6001608060020a0319600435811690602435811690604435166114c1565b005b34156105c957fe5b6105de61ffff600435811690602435166116ec565b6040805190819083908083835b80518252602083111561023857601f199092019160209182019101610218565b50505090500191505060405180910390f35b341561062557fe5b61030d61ffff600435166001608060020a0319602435811690604435811690606435166117cd565b005b341561065757fe5b61030d600435600160a060020a03602435166044351515611980565b005b341561067d57fe5b61030d61ffff600435166001608060020a0360243516611c5b565b005b6106a26127df565b6106aa6127df565b6106b26127df565b6106ba6127df565b6106c26127df565b61ffff8616600090815260036020526040812060040154819060ff1615156106e957610000565b61ffff88166000908152600360205260409081902060020154905180591061070e5750595b908082528060200260200182016040525b5061ffff891660009081526003602052604090819020600201549051919550908059106107495750595b908082528060200260200182016040525b509250600090505b61ffff80891660009081526003602052604090206002015490821610156108b45761ffff80891660009081526003602052604090206002018054909183169081106107a957fe5b90600052602060002090601091828204019190066002025b905461ffff8a811660009081526003602081815260408084206101009790970a90950490931680835294019091529081209193505b600291828204019190066010025b9054906101000a90046001608060020a0316848261ffff1681518110151561082857fe5b6001608060020a03909216602092830290910182015261ffff808a1660009081526003808452604080832093871683529201909252902060015b600291828204019190066010025b9054906101000a90046001608060020a0316838261ffff1681518110151561089457fe5b6001608060020a039092166020928302909101909101525b600101610762565b61ffff88166000908152600360209081526040918290206002018054835181840281018401909452808452879387939091839183018282801561093e57602002820191906000526020600020906000905b82829054906101000a900461ffff1661ffff16815260200190600201906020826001010492830192600103820291508084116109055790505b505050505090509650965096505b505050509193909250565b61095f612803565b61ffff821660009081526003602052604090206004015460ff16151561098457610000565b506040805160608101825261ffff831660008181526003602081815285832080546001608060020a0319608060020a8083028216895291829004820281168489015295909452919052600101540216918101919091525b919050565b60008251600014806109f157508151155b806109fb57508351155b80610a0857508251825114155b80610a1557508351835114155b15610a1f57610000565b5060005b82518161ffff16108015610a3b575081518161ffff16105b8015610a4b575083518161ffff16105b15610ab557610aac848261ffff16815181101515610a6557fe5b90602001906020020151848361ffff16815181101515610a8157fe5b90602001906020020151848461ffff16815181101515610a9d57fe5b9060200190602002015161109f565b5b600101610a23565b5b50505050565b305b90565b61ffff81166000908152600160208190526040822001548190819060a860020a900460ff161515610af157610000565b50505061ffff811660009081526001602081905260409091208054910154600160a060020a0381169060a060020a900460ff165b9193909250565b600654640100000000900463ffffffff165b90565b60025b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff166003811115610b8657fe5b1480610bd4575060035b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff166003811115610bd257fe5b145b15610d625761ffff84166000908152600160208190526040909120015460a860020a900460ff161515610c0657610000565b60035b61ffff85166000908152600160208190526040909120015460a060020a900460ff166003811115610c3657fe5b1415610c4157610000565b61ffff84811660008181526001602081815260408084208084018054600160a060020a03908116875260058552838720805461ffff19908116909a1790558a1680875292862080549098168717909755949093525290859055815473ffffffffffffffffffffffffffffffffffffffff191617905580610cc2576001610cc5565b60025b61ffff8516600090815260016020819052604090912001805460a060020a60ff02191660a060020a836003811115610cf957fe5b0217905550600160a060020a03331660009081526005602090815260408083205481519384524292840192909252805161ffff808916949316927f7107c2ae9754688147920c7dbf25c81ed808624042d38439123c6da5fe34beb492908290030190a35b610ab5565b600160a060020a033316600081815260056020908152604091829020548251428152925161ffff909116926000805160206128f183398151915292908290030190a35b50505050565b60035b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff166003811115610df057fe5b14610e3c57600160a060020a033316600081815260056020908152604091829020548251428152925161ffff909116926000805160206128f183398151915292908290030190a3610f4e565b61ffff82166000908152600160208190526040909120015460a860020a900460ff161515610e6957610000565b60035b61ffff83166000908152600160208190526040909120015460a060020a900460ff166003811115610e9957fe5b1415610ea457610000565b80610eb0576001610eb3565b60025b61ffff8316600090815260016020819052604090912001805460a060020a60ff02191660a060020a836003811115610ee757fe5b0217905550600160a060020a03331660009081526005602090815260409182902054825184151581524292810192909252825161ffff808716949216927f955f9cd413b1613b572ff1877b25ae515763d2a51d926bd21ba78d8ec4f16c3c92908290030190a35b5b5050565b610f5b6127df565b6004805480602002602001604051908101604052809291908181526020018280548015610fcf57602002820191906000526020600020906000905b82829054906101000a900461ffff1661ffff1681526020019060020190602082600101049283019260010382029150808411610f965790505b505050505090505b90565b610fe26127df565b61ffff821660009081526003602052604090206004015460ff16151561100757610000565b61ffff82166000908152600360209081526040918290206002018054835181840281018401909452808452909183018282801561108b57602002820191906000526020600020906000905b82829054906101000a900461ffff1661ffff16815260200190600201906020826001010492830192600103820291508084116110525790505b505050505090505b919050565b6004545b90565b60025b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff1660038111156110e457fe5b1480611132575060035b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff16600381111561113057fe5b145b156113f2576001608060020a0381161580611164575061ffff831660009081526003602052604090206004015460ff16155b8061118e575061ffff82166000908152600160208190526040909120015460a860020a900460ff16155b1561119857610000565b61ffff80841660009081526003602081815260408084209487168452939091019052908120905b600291828204019190066010025b905461ffff858116600090815260036020818152604080842094891684529390910190529081206101009390930a9091046001608060020a03169183915b600291828204019190066010025b9054906101000a90046001608060020a0316016001608060020a0316101561124057610000565b61ffff80841660009081526003602081815260408084209487168452939091019052908120905b600291828204019190066010025b90546001608060020a036101009290920a9004161580156112db575061ffff808416600090815260036020818152604080842094871684529390910190522060015b600291828204019190066010025b90546001608060020a036101009290920a900416155b156113395761ffff83166000908152600360205260409020600201805460018101611306838261282c565b91600052602060002090601091828204019190066002025b815461ffff8087166101009390930a92830292021916179055505b61ffff8084166000908152600360208181526040808420948716845293909101905290812082915b600291828204019190066010025b81546001608060020a036101009290920a8082048316909401821684029382021916929092179055600160a060020a03331660009081526005602090815260409182902054825193851684524291840191909152815161ffff808816948782169493909116926000805160206128b183398151915292918290030190a45b611435565b600160a060020a033316600081815260056020908152604091829020548251428152925161ffff909116926000805160206128f183398151915292908290030190a35b505050565b6114426127df565b6002805480602002602001604051908101604052809291908181526020018280548015610fcf57602002820191906000526020600020906000905b82829054906101000a900461ffff1661ffff1681526020019060020190602082600101049283019260010382029150808411610f965790505b505050505090505b90565b600060025b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff16600381111561150857fe5b1480611556575060035b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff16600381111561155457fe5b145b15610d62575060065461ffff620100009091041660009081526003602052604090208054608060020a80850481028187046001608060020a0319938416176001608060020a03161783556001808401805492860492909316919091179091556004808301805460ff1916831790558054909181016115d4838261282c565b91600052602060002090601091828204019190066002025b6006805483546101009390930a61ffff620100009283900481168202918102199094161790935554600160a060020a0333166000908152600560209081526040918290205482516001815242928101929092528251959093048416955091909216927f1f6540b99f70a62641d39a080ec69b8a1442f4a4019da09b6bb25ae3d7d7621c929181900390910190a360068054600161ffff62010000808404821692909201160263ffff0000199091161790555b610ab5565b600160a060020a033316600081815260056020908152604091829020548251428152925161ffff909116926000805160206128f183398151915292908290030190a35b50505050565b6116f4612866565b61ffff831660009081526003602052604090206004015460ff161580611739575061ffff82166000908152600160208190526040909120015460a860020a900460ff16155b1561174357610000565b61ffff83811660009081526003602081815260408084209487168452939091019052818120825180840193849052929091600291908390855b82829054906101000a90046001608060020a03166001608060020a031681526020019060100190602082600f0104928301926001038202915080841161177c5790505b505050505090505b92915050565b60025b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff16600381111561181257fe5b1480611860575060035b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff16600381111561185e57fe5b145b15610d625761ffff841660009081526003602052604090206004015460ff16151561188a57610000565b61ffff80851660008181526003602090815260408083208054608060020a808a048102818c046001608060020a0319938416176001608060020a03161783556001909201805492890492909116919091179055600160a060020a03331683526005825280832054815193845242928401929092528051939491909116927f1f6540b99f70a62641d39a080ec69b8a1442f4a4019da09b6bb25ae3d7d7621c9281900390910190a35b610ab5565b600160a060020a033316600081815260056020908152604091829020548251428152925161ffff909116926000805160206128f183398151915292908290030190a35b50505050565b60025b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff1660038111156119c557fe5b1480611a13575060035b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff166003811115611a1157fe5b145b156113f257600160a060020a0382161515611a2d57610000565b60408051608081018252848152600160a060020a038416602082015290810182611a58576001611a5b565b60025b6003811115611a6657fe5b81526001602091820181905260065461ffff1660009081528183526040908190208451815592840151918301805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039093169290921780835590840151919060a060020a60ff02191660a060020a836003811115611ade57fe5b0217905550606091909101516001918201805491151560a860020a0275ff00000000000000000000000000000000000000000019909216919091179055600654600160a060020a0384166000908152600560205260409020805461ffff191661ffff9092169190911790556002805490918101611b5b838261282c565b91600052602060002090601091828204019190066002025b60068054835461ffff6101009490940a848102199091169184160217909255905433600160a060020a031660009081526005602090815260409182902054825160018152429281019290925282519385169550909316927f7107c2ae9754688147920c7dbf25c81ed808624042d38439123c6da5fe34beb4929081900390910190a36006805461ffff8082166001011661ffff199091161790555b611435565b600160a060020a033316600081815260056020908152604091829020548251428152925161ffff909116926000805160206128f183398151915292908290030190a35b505050565b60008080808080808060025b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff166003811115611ca957fe5b1480611cf7575060035b33600160a060020a031660009081526005602090815260408083205461ffff168352600191829052909120015460a060020a900460ff166003811115611cf557fe5b145b15612790576001608060020a0389161580611d29575061ffff8a1660009081526003602052604090206004015460ff16155b80611d48575061ffff8a16600090815260036020526040902060020154155b15611d5257610000565b600097508796508695508594505b61ffff8a16600090815260036020526040902060020154851015611ea15761ffff8a16600090815260036020819052604082206002810180549190920192919088908110611daa57fe5b90600052602060002090601091828204019190066002025b905461ffff6101009290920a900416815260208101919091526040016000908120905b600291828204019190066010025b905461ffff8c16600090815260036020819052604082206002810180546101009690960a9094046001608060020a03169c909c019b019290919088908110611e3757fe5b90600052602060002090601091828204019190066002025b905461ffff6101009290920a9004168152602081019190915260400160002060015b600291828204019190066010025b9054906101000a90046001608060020a0316870196505b600190940193611d60565b600094506000886001608060020a0316111561227157600094505b61ffff8a166000908152600360205260409020600201548510156122715761ffff8a166000908152600360205260409020600201805486908110611efc57fe5b90600052602060002090601091828204019190066002025b905461ffff8c811660009081526003602081815260408084206101009790970a90950490931680835294019091529081209195505b600291828204019190066010025b905461ffff8c81166000908152600360208181526040808420948b168452939091019052206101009290920a90046001608060020a0316935060015b600291828204019190066010025b9054906101000a90046001608060020a03169150876001608060020a03168984026001608060020a0316811515611fd457fe5b0490506000816001608060020a0316118015611ff957506000836001608060020a0316115b1561226557826001608060020a03168184036001608060020a031611156120e857600160a060020a03331660009081526005602090815260408083205481516001608060020a03881690940384524292840192909252805161ffff808f169489821694909116926000805160206128b183398151915292918290030190a433600160a060020a03166000908152600560209081526040918290205482516001608060020a03871681524292810192909252825161ffff8e8116948982169491909316926000805160206128d183398151915292918290030190a4958201959482019460009291909101906121b3565b600160a060020a03331660009081526005602090815260408083205481516001608060020a03861690940384524292840192909252805161ffff808f169489821694909116926000805160206128b183398151915292918290030190a433600160a060020a03166000908152600560209081526040918290205482516001608060020a03851681524292810192909252825161ffff8e8116948982169491909316926000805160206128d183398151915292918290030190a495860195948501949182900391908101905b61ffff808b166000908152600360208181526040808420948916845293909101905290812084915b600291828204019190066010025b81546001608060020a039384166101009290920a91820293909102191691909117905561ffff808b166000908152600360208181526040808420948916845293909101905220829060015b600291828204019190066010025b6101000a8154816001608060020a0302191690836001608060020a031602179055505b5b600190940193611ebc565b5b886001608060020a0316866001608060020a03161015612447576000876001608060020a0316111561244757600094505b61ffff8a166000908152600360205260409020600201548510156124475761ffff8a1660009081526003602052604090206002018054869081106122e357fe5b90600052602060002090601091828204019190066002025b905461ffff8c811660009081526003602081815260408084206101009790970a90950490931680835294019091522090945060015b600291828204019190066010025b9054906101000a90046001608060020a03169150866001608060020a0316868a0383026001608060020a031681151561237357fe5b0490506000816001608060020a0316111561243b5761ffff808b1660009081526003602081815260408084209489168452939091019052209581019591810191829060015b600291828204019190066010025b81546001608060020a039384166101009290920a9182029184021916179055600160a060020a03331660009081526005602090815260409182902054825193851684524291840191909152815161ffff808f16948982169493909116926000805160206128d183398151915292918290030190a45b5b6001909401936122a3565b5b5b5b886001608060020a0316866001608060020a031610156127035761ffff8a1660009081526003602052604090206002018054600019810190811061248a57fe5b90600052602060002090601091828204019190066002025b905461ffff8c811660009081526003602081815260408084206101009790970a9095049093168083529401909152908120919550878b0392505b600291828204019190066010025b9054906101000a90046001608060020a03169250806001608060020a0316836001608060020a0316111561257f57600160a060020a03331660009081526005602090815260408083205481516001608060020a038616909403845242928401929092528051958490039561ffff808f169489821694909116926000805160206128b183398151915292918290030190a46125f3565b6000836001608060020a031611156125f357600160a060020a03331660009081526005602090815260408083205481516001608060020a03881690940384524292840192909252805161ffff808f169489821694909116926000805160206128b183398151915292918290030190a4600092505b5b61ffff808b166000908152600360208181526040808420948916845293909101905220819060015b600291828204019190066010025b81546001608060020a036101009290920a808204831690940182168402919093021990921691909117905561ffff808b166000908152600360208181526040808420948916845293909101905290812084915b600291828204019190066010025b81546001608060020a039384166101009290920a9182029184021916179055600160a060020a03331660009081526005602090815260409182902054825193851684524291840191909152815161ffff808f16948982169493909116926000805160206128d183398151915292918290030190a48895505b886001608060020a0316866001608060020a0316111561272257610000565b600160a060020a0333166000908152600560209081526040918290205482516001608060020a038a1681524292810192909252825161ffff808f16949216927f56b23e5cb3910a046f9a66c3017ae49b4def7ebae1fb08b4adf446b4fd4c47f192908290030190a35b6127d3565b600160a060020a033316600081815260056020908152604091829020548251428152925161ffff909116926000805160206128f183398151915292908290030190a35b50505050505050505050565b60408051602081019091526000815290565b60408051602081019091526000815290565b6060604051908101604052806003905b6000815260001990910190602001816128135790505090565b81548183558181151161143557600f016010900481600f01601090048360005260206000209182019101611435919061288f565b5b505050565b6040604051908101604052806002905b6000815260001990910190602001816128135790505090565b610abe91905b808211156128a95760008155600101612895565b5090565b905600f3eb50aadbf0d7c57ec5f56ac9bc98188c5eaf05702012ebfe3698cf182ccb4b190acdb2d73a06a0bfaba310bd3d6a1828c500aeab3cbc74168a53e44565c9e008a520c83f3f94e52d4d4b14319f76c4924f0b58aa571d1d8956acc5849651eaa165627a7a72305820cb654fb287a5f18d73c5b66a0887e4bba16e9c52de68ae77b00a7da80b5e75c30029';

		this.contractGas = '4700000';

		this.connected = false;
		this.initialized = false;
		this.lastBlockNumber = 0;

		this.self = this;
	}

	isWeb3Available(){
		if(typeof web3 == "undefined") return false;
		return true;
	}

	init(callback){
		var self = this;

		web3.eth.getAccounts(function(err, accs) {
			if (err != null) {
				callback("There was an error fetching your accounts.");
				return;
			}

			if (accs.length == 0) {
				callback("Couldn't get any accounts! Make sure Metamask is configured correctly.");
				return;
			}
		
			self.accounts = accs;
			self.account = self.accounts[0];

			console.log("Extracted accounts: ",self.accounts);
			
			callback();
		});
	}

	deployNewContract(callback) {
		var self = this;

		var obitcoinContract = web3.eth.contract(this.contractAbi);
		this.Obitcoin = obitcoinContract.new(
		{
			from: web3.eth.accounts[0], 
			data: this.contractCompiled, 
			gas: this.contractGas
		}, function (e, contract){
			if(e) callback(e, undefined);
			else if (typeof contract.address !== 'undefined') {
				console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
				console.log(contract);

				self.connected = true;

				callback(e, contract.address);
			}
		});
	}

	connectToContract(address, callback) {

		var obitcoinContract = web3.eth.contract(this.contractAbi);
		
		this.Obitcoin = obitcoinContract.at(address);
		
		var self = this;

		try {
			this.Obitcoin.getContractAddress.call({from: this.account}, function(error, result){
				if(!error){
					if(result==address){
						console.log("Connection successful");
						self.connected = true;
						callback();
					} else {
						callback("Invalid address!");
					}
				}
				else{
					console.error(error);
					callback("There was an error. Reload the page and try again");
				}
			});
		} catch (err){
			callback(err.message);
		}
	}

	isConnected(){
		return this.connected;
	}

	getAccount(){
		return this.account;
	}

	getPools(callback){
		this.Obitcoin.getPools.call({from: this.account}, function(error, result){
			if(!error){
				var data = [];
				result.forEach(res => data.push(res.valueOf()));
				callback(data);
			}
			else
				console.error(error);
		});
	}

	getPoolData(pool, callback){
		var self = this;
		this.Obitcoin.getPoolData.call(pool, {from: this.account}, function(error, result){
			if(!error){
				var data = [];
				result.forEach(item => data.push(self.hex2a(item)));
				callback(data);
			}
			else
				console.error(error);
		});
	}

	getPoolParticipants(pool, callback) {
		this.Obitcoin.getPoolParticipants.call(pool, {from: this.account}, function(error, result){
			if(!error){
				var data = [];
				result.forEach(res => data.push(res.valueOf()));
				callback(data);
			}
			else
				console.error(error);
		});
	}

	getMembers(callback){
		this.Obitcoin.getMembers.call({from: this.account}, function(error, result){
			if(!error){
				var data = [];
				result.forEach(res => data.push(res.valueOf()));
				callback(data);
			}
			else
				console.error(error);
		});
	}

	getMemberBalance(pool, member, callback){
		this.Obitcoin.getMemberBalance.call(pool, member, {from: this.account}, function(error, result){
			if(!error){
				var data = [];
				result.forEach(res => data.push(res.valueOf()));
				callback(data, member);
			}
			else
				console.error(error);
		});
	}

	getMembersBalance(pool: Number, callback: Function){
		this.Obitcoin.getMembersBalance.call(pool, {from: this.account}, function(error, result){
			if(!error){
				var members = [];
				var tokens = [];
				var slices = [];
				if(result[0].length != result[1].length || result[1].length != result[2].length) console.log("Received corrupt data on getMembersBalance("+pool+")");

				for(var i = 0; i<result[0].length; i++){
					tokens[i] = Number(result[0][i].valueOf());
					slices[i] = Number(result[1][i].valueOf());
					members[i] = Number(result[2][i].valueOf());
				}

				callback(members, tokens, slices);
			} else console.log(error);
		});
	}

	getMemberDetails(member: Number, callback: Function){
		var self = this;

		this.Obitcoin.getMemberDetails.call(member, {from: this.account}, function(error, result){
			if(!error){
				var data = new Array(3);
				data[0] = self.hex2a(result[0]);
				data[1] = result[1];
				data[2] = result[2].valueOf();

				callback(data);
			}
			else
				console.error(error);
		});
	}

	getWholeMembers(callback: Function){
		var members = [];
		var self = this;
		this.getMembers(function(data){
			if(data.length==0) callback(members);
			for(var i = 0; i<data.length; i++){
				self.getWholeMember(data[i], function(member: Member){
					members.push(member);

					if(members.length == data.length){
						console.log("Loaded members: ",members);
						callback(members);
					}
				});

			}
		});
	}

	getWholeMember(id: Number, callback: Function){
		var member = new Member();
		member.id = Number(id);

		this.getMemberDetails(id, function(result){
			member.name = result[0];
			member.address = result[1];
			member.permissionLevel = result[2];

			callback(member);
		});
	}

	getWholePools(callback: Function){
		var pools = [];
		var self = this;
		this.getPools(function(data: Number[]){
			if(data.length==0) callback(pools);

			for(var i = 0; i<data.length; i++){
				self.getWholePool(data[i], function(pool: Pool){
					pools.push(pool);

					if(pools.length == data.length){
						console.log("Loaded pools: ", pools);
						callback(pools);
					}
				});

			}
		});
	}

	getWholePool(id: Number, callback: Function){
		var self = this;

		var pool = new Pool();
		pool.id = Number(id);
		var stage1=false, stage2=false;

		pool.tokens = new Map<number, number>();
		pool.slices = new Map<number, number>();

		this.getPoolData(id, function(result: string[]){
			pool.name = result[0];
			pool.legalContract = result[1];
			pool.financialReports = result[2];

			stage1=true;

			if(stage1 && stage2) callback(pool);
		});

		this.getMembersBalance(id, function(members: number[], tokens: number[], slices: number){
			pool.members = members;

			for(var i = 0; i<members.length; i++){
				pool.tokens[members[i]] = tokens[i];
				pool.slices[members[i]] = slices[i];
			}

			stage2 = true;

			if(stage2 && stage1) callback(pool);
		});
	}

	addMember(name, address, isAdmin, callback){
		this.Obitcoin.addMember(name, address, isAdmin, {from: this.account}, function(error, result){
			if(!error){
				callback(result);
			}
			else
				console.error(error);
		});
	}

	setAdmin(member, admin) {
		this.Obitcoin.setAdmin(member, admin, {from: this.account}, function(error, result){
			if(!error)
				console.log(result);
			else
				console.error(error);
		});
	}

	createDebtPool(name, legalContract, financialReports, callback) {
		this.Obitcoin.createDebtPool(name, legalContract, financialReports, {from: this.account}, function(error, result){
			if(!error)
				callback(result);
			else
				console.error(error);
		});
	}

	updateMember(member, name, address, isAdmin, callback){

		this.Obitcoin.updateMember(member, name, address, isAdmin, {from: this.account}, function(error, result){
			if(!error){
				console.log(result);
				callback(result);
			}
			else
				console.error(error);
		});
	}

	updatePool(pool, name, legalContract, financialReports, callback){
		this.Obitcoin.updateDebtPool(pool, name, legalContract, financialReports, {from: this.account}, function(error, result){
			if(!error){
				console.log(result);
				callback(result);
			}
			else
				console.error(error);
		});
	}

	sendTokens(pools, member, amount, callback){
		this.Obitcoin.sendTokens(pools, member, amount, {from: this.account}, function(error, result){
			if(!error)
				callback(result)
			else
				console.error(error);
		});
	}

	sendTokensBulk(pool, members, amount, callback){
		this.Obitcoin.sendTokensBulk(pool, members, amount, {from: this.account}, function(error, result){
			if(!error)
				callback(result)
			else
				console.error(error);
		});
	}

	buyTokens(pool, amount, callback){
		this.Obitcoin.buyTokens(pool, amount, {from: this.account}, function(error, result){
			if(!error)
				callback(result)
			else
				console.error(error);
		});
	}

	getLastBlockNumber(){
		return this.lastBlockNumber;
	}

	startListeningForEvents(callback){
		var self = this;

		this.lastBlockNumber = web3.eth.getBlockNumber(function(err, result){
			if(err) return;
			self.lastBlockNumber = result;

			self.Obitcoin.getPublishingBlockNumber.call({from: self.account}, function(error, result){

				var events = self.Obitcoin.allEvents({fromBlock: result.valueOf()});
				events.watch(function(err, event) {
					if (err) {
						console.log(err)
						return;
					}
					callback(event);
				});

			});
		});

		/*var coinsTransferEvent = this.Obitcoin.CoinsTransfer({}, {fromBlock: 0});
		coinsTransferEvent.watch(function(err, result) {
			if (err) {
				console.log(err)
				return;
			}
			console.log("["+result.args.time.valueOf()+"] sent "+result.args.amount.valueOf()+" from "+result.args.from+" to "+result.args.to);
		});
		
		var coinsPurchaseEvent = this.Obitcoin.CoinsPurchase({}, {fromBlock: 0});
		coinsPurchaseEvent.watch(function(err, result) {
			if (err) {
				console.log(err)
				return;
			}
			console.log("["+result.args.time.valueOf()+"] bought "+result.args.amount.valueOf()+" from "+result.args.from+" to "+result.args.poolIndex+" debt pool");
		});
		
		var poolCreatedEvent = this.Obitcoin.PoolCreated({}, {fromBlock: 0});
		poolCreatedEvent.watch(function(err,result) {
			if(err) {
				console.log(err);
				return;
			}
			console.log("["+result.args.time.valueOf()+"] created pool with index "+result.args.index.valueOf());
		});
		
		var unauthorizedAccessEvent = this.Obitcoin.UnauthorizedAccess({}, {fromBlock: 0});
		unauthorizedAccessEvent.watch(function(err,result) {
			if(err) {
				console.log(err);
				return;
			}
			console.log("["+result.args.time.valueOf()+"] Warning! Unauthorized access from "+result.args.from);
		});
		
		var adminChangedEvent = this.Obitcoin.AdminChanged({}, {fromBlock: 0});
		adminChangedEvent.watch(function(err,result) {
			if(err) {
				console.log(err);
				return;
			}
			console.log("["+result.args.time.valueOf()+"]" + (result.args.added ? "Added" : "Removed") + " admin with address "+result.args.person);
		});*/
		
		
	}

	hex2a(hexx) {
		var hex = hexx.toString();//force conversion
		var str = '';
		var int;
		for (var i = 2; i < hex.length; i += 2){
			int = parseInt(hex.substr(i, 2), 16);
			if(int==0) continue;
			str += String.fromCharCode(int);
		}
		return str;
	}

	bin2string(array){
		var result = "";
		for(var i = 0; i < array.length; ++i){
			result+= (String.fromCharCode(array[i]));
		}
		return result;
	}

}