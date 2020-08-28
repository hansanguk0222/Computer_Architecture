const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const input = []
let which = 0

const CPU = require('./CPU')
const Memory = require('./Memory')

const memory = new Memory()
const cpu = new CPU()

const parseValue = (str) => {
    return str.split(' ')
}

const funcP = (x) => {
    return new Promise((resolve, reject) => {
        setTimeout(_ => {
            console.log(x)
            resolve(x)
        })
    }, 1000)
}

const make_cpu_work = async (memory) => {
    for(let i = 0; i < memory.length; i++) {
        cpu.fetch(memory)

        await cpu.show(memory)
        await cpu.log_clear()

        const arr = cpu.IR.split(' ')
        const instruction = arr[0]

        switch(instruction) {
            case 'LOAD':
                cpu.LOAD(memory)
                break
            case 'ADD1':
                cpu.ADD1(memory)
                break
            case 'SUB1':
                cpu.SUB1(memory)
                break
            case 'MUL1':
                cpu.MUL1(memory)
                break
            case 'DIV1':
                cpu.DIV1(memory)
                break
            case 'STOR':
                cpu.STOR(memory)
                break
            case 'MOV':
                cpu.MOV(memory)
                break
            case 'ADD2':
                cpu.ADD2(memory)
                break
            case 'SUB2':
                cpu.SUB2(memory)
                break
            case 'MUL2':
                cpu.MUL2(memory)
                break
            case 'DIV2':
                cpu.DIV2(memory)
                break
            case 'ADD3':
                cpu.ADD3(memory)
                break
            case 'SUB3':
                cpu.SUB3(memory)
                break
            case 'MUL3':
                cpu.MUL3(memory)
                break
            case 'DIV3':
                cpu.DIV3(memory)
                break
        }

        await cpu.show(memory)
        await cpu.log_clear()
    }
    
    process.exit()
}

rl.setPrompt('1주소, 2주소, 3주소 중에서 입력해주세요 >> ')
rl.prompt()
rl.on('line', line =>{
    if(which === 0) {
        if(1 <= parseInt(line) && parseInt(line) <= 3) {
            which = parseInt(line)
            rl.setPrompt(`${which}주소로 입력 하였습니다. quit 입력 시 명령어 입력 받기 완료 후 메모리 자동 임의 값으로 초기화 >> `)
        }
    }
    else {
        const arr = parseValue(line)
        if(which === 1 && (arr[0] === 'LOAD' || arr[0] === 'ADD1' || arr[0] === 'SUB1' || arr[0] === 'MUL1' || arr[0] === 'DIV1' || arr[0] === 'STOR')) {
            arr.shift()
            memory.set_Memory(arr)
            input.push(line)
        }
        else if(which === 2 && (arr[0] === 'MOV' || arr[0] === 'ADD2' || arr[0] === 'SUB2' || arr[0] === 'MUL2' || arr[0] === 'DIV2')) {
            memory.set_Memory(arr)
            input.push(line)
        }
        else if(which === 3 && (arr[0] === 'ADD3' || arr[0] === 'SUB3' || arr[0] === 'MUL3' || arr[0] === 'DIV3')) {
            memory.set_Memory(arr)
            input.push(line)
        }
        else if(line === 'quit') {
            rl.setPrompt('')
            memory.load_instruction(input)
            rl.close()
        }
        else {
            console.log(`${which}주소인데 잘못된 명령어를 입력하셨습니다.`)
        }
    }
    rl.prompt()
}).on('close', () => {
    make_cpu_work(memory)
})