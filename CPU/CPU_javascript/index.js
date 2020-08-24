const CPU = require('./CPU')
const Memory = require('./Memory')

const memory = new Memory()
const cpu = new CPU()

const parseValue = (str) => {
    return str.split(', ')
}

const make_cpu_work = (memory) => {
    for(let i = 0; i < memory.length; i++) {
        (function(j) {
            setTimeout(() => {
                cpu.fetch(memory)
                const arr = cpu.IR.split(' ')
                const instruction = arr[0]
                
                if(arr.length === 2) {
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
                    }
                }
                else if(arr.length === 3) {
                    switch(instruction) {
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
                    }
                }
                else if(arr.length === 4) {
                    switch(instruction) {
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
                }
            }, 2000 * (j + 1))
        })(i);
        (function(j) {
            setTimeout(() =>{
                console.clear()
            }, 2000 * (j + 2))
        })(i)
    }
}

const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value)

const instruction1 = 'LOAD A, ADD1 B, STOR T, LOAD C, SUB1 D, MUL1 T, STOR X'
const instruction2 = 'MOV R1 A, ADD2 R1 B, MOV R2 C, SUB2 R2 D, MUL2 R1 R2, MOV X R1'
const instruction3 = 'ADD3 R1 A B, SUB3 R2 C D, MUL3 X R1 R2'
memory.mem['A'] = 1
memory.mem['B'] = 2
memory.mem['T'] = 0
memory.mem['C'] = 6
memory.mem['D'] = 3
memory.mem['X'] = 0

const res = pipe(
    x => parseValue(x), //명령어 파싱
    x => memory.load_instruction(x), //메모리에 명령어 올리기
    x => make_cpu_work(x)
)(instruction3)
