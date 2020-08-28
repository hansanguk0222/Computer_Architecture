const Memory = require("./Memory")
const { resolve } = require("path")

class CPU {
    constructor() {
        this.MAR = 0
        this.MBR = 0
        this.register = {}
        this.PC = 0
        this.IR = 0
        this.AC = 0
        this.SP = 0
    }

    //명령어 인출
    fetch(memory) {
        console.log('fetch')
        this.MAR = this.PC
        this.MBR = memory.mem[this.MAR.toString()]
        this.PC++
        this.IR = this.MBR
        this.MAR = 0 //MAR 초기화
        this.MBR = 0 //MBR 초기화
    }

    //명령어 실행, LOAD는 기억장치에 저장된 데이터를 AC로 이동
    LOAD(memory) {
        console.log('LOAD')
        this.MAR = this.IR.split(' ')[1]
        this.MBR = memory.mem[this.MAR]
        this.AC = this.MBR
        this.MAR = 0 //MAR 초기화
        this.MBR = 0 //MBR 초기화
    }
    
    ADD1(memory) {
        console.log('ADD1')
        this.MAR = this.IR.split(' ')[1]
        this.MBR = memory.mem[this.MAR]
        this.AC = this.AC + this.MBR
        this.MAR = 0 //MAR 초기화
        this.MBR = 0 //MBR 초기화
    }

    SUB1(memory) {
        console.log('SUB1')
        this.MAR = this.IR.split(' ')[1]
        this.MBR = memory.mem[this.MAR]
        this.AC = this.AC - this.MBR
        this.MAR = 0 //MAR 초기화
        this.MBR = 0 //MBR 초기화
    }

    MUL1(memory) {
        console.log('MUL1')
        this.MAR = this.IR.split(' ')[1]
        this.MBR = memory.mem[this.MAR]
        this.AC = this.AC * this.MBR
        this.MAR = 0 //MAR 초기화
        this.MBR = 0 //MBR 초기화
    }

    DIV1(memory) {
        console.log('DIV1')
        this.MAR = this.IR.split(' ')[1]
        this.MBR = memory.mem[this.MAR]
        this.AC = Math.floor(this.AC / this.MBR)
        this.MAR = 0 //MAR 초기화
        this.MBR = 0 //MBR 초기화
    }
    
    STOR(memory) {
        console.log('STOR')
        this.MAR = this.IR.split(' ')[1]
        this.MBR = this.AC
        memory.mem[this.MAR] = this.MBR
        this.MAR = 0 //MAR 초기화
        this.MBR = 0 //MBR 초기화
    }

    MOV(memory) {
        console.log('MOV')
        this.MAR = this.IR.split(' ').splice(1, 2)

        if(this.MAR[0][0] === 'R' && this.MAR[1][0] === 'R') {
            this.MBR = this.register[this.MAR[1]]
            this.register[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] === 'R' && this.MAR[1][0] !== 'R') {
            this.MBR = memory.mem[this.MAR[1]]
            this.register[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] === 'R') {
            this.MBR = this.register[this.MAR[1]]
            memory.mem[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] !== 'R') {
            this.MBR = memory.mem[this.MAR[1]]
            memory.mem[this.MAR[0]] = this.MBR
        }

        this.MAR = 0 //MAR 초기화
        this.MBR = 0 //MBR 초기화
    }

    ADD2(memory) {
        console.log('ADD2')
        this.MAR = this.IR.split(' ').splice(1, 2)

        if(this.MAR[0][0] === 'R' && this.MAR[1][0] === 'R') {
            this.MBR = this.register[this.MAR[1]]
            this.register[this.MAR[0]] += this.MBR
        }
        else if(this.MAR[0][0] === 'R' && this.MAR[1][0] !== 'R') {
            this.MBR = memory.mem[this.MAR[1]]
            this.register[this.MAR[0]] += this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] === 'R') {
            this.MBR = this.register[this.MAR[1]]
            memory.mem[this.MAR[0]] += this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] !== 'R') {
            this.MBR = memory.mem[this.MAR[1]]
            memory.mem[this.MAR[0]] += this.MBR
        }

        this.MAR = 0 //MAR 초기화
        this.MBR = 0 //MBR 초기화
    }

    SUB2(memory) {
        console.log('SUB2')
        this.MAR = this.IR.split(' ').splice(1, 2)

        if(this.MAR[0][0] === 'R' && this.MAR[1][0] === 'R') {
            this.MBR = this.register[this.MAR[1]]
            this.register[this.MAR[0]] -= this.MBR
        }
        else if(this.MAR[0][0] === 'R' && this.MAR[1][0] !== 'R') {
            this.MBR = memory.mem[this.MAR[1]]
            this.register[this.MAR[0]] -= this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] === 'R') {
            this.MBR = this.register[this.MAR[1]]
            memory.mem[this.MAR[0]] -= this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] !== 'R') {
            this.MBR = memory.mem[this.MAR[1]]
            memory.mem[this.MAR[0]] -= this.MBR
        }
        
        this.MAR = 0 //MAR 초기화
        this.MBR = 0 //MBR 초기화
    }

    MUL2(memory) {
        console.log('MUL2')
        this.MAR = this.IR.split(' ').splice(1, 2)

        if(this.MAR[0][0] === 'R' && this.MAR[1][0] === 'R') {
            this.MBR = this.register[this.MAR[1]]
            this.register[this.MAR[0]] *= this.MBR
        }
        else if(this.MAR[0][0] === 'R' && this.MAR[1][0] !== 'R') {
            this.MBR = memory.mem[this.MAR[1]]
            this.register[this.MAR[0]] *= this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] === 'R') {
            this.MBR = this.register[this.MAR[1]]
            memory.mem[this.MAR[0]] *= this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] !== 'R') {
            this.MBR = memory.mem[this.MAR[1]]
            memory.mem[this.MAR[0]] *= this.MBR
        }
        
        this.MAR = 0 //MAR 초기화
        this.MBR = 0 //MBR 초기화
    }

    DIV2(memory) {
        console.log('DIV2')
        this.MAR = this.IR.split(' ').splice(1, 2)

        if(this.MAR[0][0] === 'R' && this.MAR[1][0] === 'R') {
            this.MBR = this.register[this.MAR[1]]
            this.register[this.MAR[0]] = Math.floor(this.register[this.MAR[0]] / this.MBR)
        }
        else if(this.MAR[0][0] === 'R' && this.MAR[1][0] !== 'R') {
            this.MBR = memory.mem[this.MAR[1]]
            this.register[this.MAR[0]] = Math.floor(this.register[this.MAR[0]] / this.MBR)
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] === 'R') {
            this.MBR = this.register[this.MAR[1]]
            memory.mem[this.MAR[0]] = Math.floor(memory.mem[this.MAR[0]] / this.MBR)
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] !== 'R') {
            this.MBR = memory.mem[this.MAR[1]]
            memory.mem[this.MAR[0]] = Math.floor(memory.mem[this.MAR[0]] / this.MBR)
        }
        
        this.MAR = 0 //MAR 초기화
        this.MBR = 0 //MBR 초기화
    }

    ADD3(memory) {
        console.log('ADD3')
        this.MAR = this.IR.split(' ').splice(1, 3)

        if(this.MAR[0][0] === 'R' && this.MAR[1][0] === 'R' && this.MAR[2][0] === 'R') {
            this.MBR = this.register[this.MAR[1]] + this.register[this.MAR[2]]
            this.register[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] === 'R' && this.MAR[1][0] !== 'R' && this.MAR[2][0] === 'R') {
            this.MBR = memory.mem[this.MAR[1]] + this.register[this.MAR[2]]
            this.register[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] === 'R' && this.MAR[1][0] === 'R' && this.MAR[2][0] !== 'R') {
            this.MBR = this.register[this.MAR[1]] + memory.mem[this.MAR[2]]
            this.register[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] === 'R' && this.MAR[1][0] !== 'R' && this.MAR[2][0] !== 'R') {
            this.MBR = memory.mem[this.MAR[1]] + memory.mem[this.MAR[2]]
            this.register[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] === 'R' && this.MAR[2][0] === 'R') {
            this.MBR = this.register[this.MAR[1]] + this.register[this.MAR[2]]
            memory.mem[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] !== 'R' && this.MAR[2][0] === 'R') {
            this.MBR = memory.mem[this.MAR[1]] + this.register[this.MAR[2]]
            memory.mem[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] === 'R' && this.MAR[2][0] !== 'R') {
            this.MBR = this.register[this.MAR[1]] + memory.mem[this.MAR[2]]
            memory.mem[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] !== 'R' && this.MAR[2][0] !== 'R') {
            this.MBR = memory.mem[this.MAR[1]] + memory.mem[this.MAR[2]]
            memory.mem[this.MAR[0]] = this.MBR
        }

        this.MAR = 0 //MAR 초기화
        this.MBR = 0 //MBR 초기화
    }

    SUB3(memory) {
        console.log('SUB3')
        this.MAR = this.IR.split(' ').splice(1, 3)

        if(this.MAR[0][0] === 'R' && this.MAR[1][0] === 'R' && this.MAR[2][0] === 'R') {
            this.MBR = this.register[this.MAR[1]] - this.register[this.MAR[2]]
            this.register[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] === 'R' && this.MAR[1][0] !== 'R' && this.MAR[2][0] === 'R') {
            this.MBR = memory.mem[this.MAR[1]] - this.register[this.MAR[2]]
            this.register[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] === 'R' && this.MAR[1][0] === 'R' && this.MAR[2][0] !== 'R') {
            this.MBR = this.register[this.MAR[1]] - memory.mem[this.MAR[2]]
            this.register[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] === 'R' && this.MAR[1][0] !== 'R' && this.MAR[2][0] !== 'R') {
            this.MBR = memory.mem[this.MAR[1]] - memory.mem[this.MAR[2]]
            this.register[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] === 'R' && this.MAR[2][0] === 'R') {
            this.MBR = this.register[this.MAR[1]] - this.register[this.MAR[2]]
            memory.mem[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] !== 'R' && this.MAR[2][0] === 'R') {
            this.MBR = memory.mem[this.MAR[1]] - this.register[this.MAR[2]]
            memory.mem[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] === 'R' && this.MAR[2][0] !== 'R') {
            this.MBR = this.register[this.MAR[1]] - memory.mem[this.MAR[2]]
            memory.mem[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] !== 'R' && this.MAR[2][0] !== 'R') {
            this.MBR = memory.mem[this.MAR[1]] - memory.mem[this.MAR[2]]
            memory.mem[this.MAR[0]] = this.MBR
        }

        this.MAR = 0 //MAR 초기화
        this.MBR = 0 //MBR 초기화
    }

    MUL3(memory) {
        console.log('MUL3')
        this.MAR = this.IR.split(' ').splice(1, 3)

        if(this.MAR[0][0] === 'R' && this.MAR[1][0] === 'R' && this.MAR[2][0] === 'R') {
            this.MBR = this.register[this.MAR[1]] * this.register[this.MAR[2]]
            this.register[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] === 'R' && this.MAR[1][0] !== 'R' && this.MAR[2][0] === 'R') {
            this.MBR = memory.mem[this.MAR[1]] * this.register[this.MAR[2]]
            this.register[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] === 'R' && this.MAR[1][0] === 'R' && this.MAR[2][0] !== 'R') {
            this.MBR = this.register[this.MAR[1]] * memory.mem[this.MAR[2]]
            this.register[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] === 'R' && this.MAR[1][0] !== 'R' && this.MAR[2][0] !== 'R') {
            this.MBR = memory.mem[this.MAR[1]] * memory.mem[this.MAR[2]]
            this.register[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] === 'R' && this.MAR[2][0] === 'R') {
            this.MBR = this.register[this.MAR[1]] * this.register[this.MAR[2]]
            memory.mem[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] !== 'R' && this.MAR[2][0] === 'R') {
            this.MBR = memory.mem[this.MAR[1]] * this.register[this.MAR[2]]
            memory.mem[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] === 'R' && this.MAR[2][0] !== 'R') {
            this.MBR = this.register[this.MAR[1]] * memory.mem[this.MAR[2]]
            memory.mem[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] !== 'R' && this.MAR[2][0] !== 'R') {
            this.MBR = memory.mem[this.MAR[1]] * memory.mem[this.MAR[2]]
            memory.mem[this.MAR[0]] = this.MBR
        }

        this.MAR = 0 //MAR 초기화
        this.MBR = 0 //MBR 초기화
    }

    DIV3(memory) {
        console.log('DIV3')
        this.MAR = this.IR.split(' ').splice(1, 3)

        if(this.MAR[0][0] === 'R' && this.MAR[1][0] === 'R' && this.MAR[2][0] === 'R') {
            this.MBR = Math.floor(this.register[this.MAR[1]] / this.register[this.MAR[2]])
            this.register[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] === 'R' && this.MAR[1][0] !== 'R' && this.MAR[2][0] === 'R') {
            this.MBR = Math.floor(memory.mem[this.MAR[1]] / this.register[this.MAR[2]])
            this.register[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] === 'R' && this.MAR[1][0] === 'R' && this.MAR[2][0] !== 'R') {
            this.MBR = Math.floor(this.register[this.MAR[1]] / memory.mem[this.MAR[2]])
            this.register[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] === 'R' && this.MAR[1][0] !== 'R' && this.MAR[2][0] !== 'R') {
            this.MBR = Math.floor(memory.mem[this.MAR[1]] / memory.mem[this.MAR[2]])
            this.register[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] === 'R' && this.MAR[2][0] === 'R') {
            this.MBR = Math.floor(this.register[this.MAR[1]] / this.register[this.MAR[2]])
            memory.mem[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] !== 'R' && this.MAR[2][0] === 'R') {
            this.MBR = Math.floor(memory.mem[this.MAR[1]] / this.register[this.MAR[2]])
            memory.mem[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] === 'R' && this.MAR[2][0] !== 'R') {
            this.MBR = Math.floor(this.register[this.MAR[1]] / memory.mem[this.MAR[2]])
            memory.mem[this.MAR[0]] = this.MBR
        }
        else if(this.MAR[0][0] !== 'R' && this.MAR[1][0] !== 'R' && this.MAR[2][0] !== 'R') {
            this.MBR = Math.floor(memory.mem[this.MAR[1]] / memory.mem[this.MAR[2]])
            memory.mem[this.MAR[0]] = this.MBR
        }

        this.MAR = 0 //MAR 초기화
        this.MBR = 0 //MBR 초기화
    }

    CALL(addr) {

    }

    RET() {

    }

    show(memory) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`PC : ${this.PC}, AC : ${this.AC}, MAR : ${this.MAR}, MBR : ${this.MBR}, IR : ${this.IR}, SP : ${this.SP}, register : `, this.register)
                console.log(memory)
                resolve([this, memory])
            }, 1000)
        })
    }

    log_clear() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.clear()
                resolve(this)
            }, 3000)
        })
    }
}

module.exports = CPU