const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile')

let accounts
let inbox

beforeEach (async () => {
    
    //Get accounts made by ganache locally
    accounts = await web3.eth.getAccounts()

    //Use one of the accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data : bytecode,arguments : ['hi there !']})
    .send({from : accounts[0],gas : '1000000'})

    //console.log(accounts)
})

describe('Inbox',()=>{

    it('can deploy',()=>{
        console.log(inbox)
    })

    it('is deployed',()=>{
        assert.ok(inbox.options.address)
    })

    it('has a default value',async ()=>{
        const msg = await inbox.methods.Message().call()
        assert.strictEqual(msg,'hi there !')
    })

    it('can set messages',async ()=>{
        await inbox.methods.setMessage('ok').send({from : accounts[0]})
        const msg = await inbox.methods.Message().call()
        assert.strictEqual(msg,'ok')
    })

})

