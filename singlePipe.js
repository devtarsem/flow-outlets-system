'use strict'
const singlePipePanel = document.querySelector('.display-container-main-working-single-pipe')
const doublePipePanel = document.querySelector('.display-container-main-working-double-pipe')
const singlePipeBtn = document.querySelector('.singleBtn')
const doublePipeBtn = document.querySelector('.doubleBtn')

const maxVelocitySinglePipeResult = document.querySelector('.maxVelSinglePipe')
const maxFlowrateSinglePipeResult = document.querySelector('.maxFlowSinglePipe')
const actualVelocitySINGLEPipe = document.querySelector('.actualSinglePipeVel')
const actualFlowRateSINGLEPipe = document.querySelector('.actualSinglePipeFlow')

const prevMaxVel = document.querySelector('.prev_max_vel')
const prevMaxflow = document.querySelector('.prev_max_flow')
const prevActflow = document.querySelector('.prev_act_flow')
const prevActVel = document.querySelector('.prev_act_vel')


doublePipePanel.style.transform = 'translate(100%)'
singlePipePanel.style.transform = 'translate(0%)'


/*****pipe variable analysisng  */
const v1 = document.querySelector('.v1')
const p1 = document.querySelector('.p1')
const p2 = document.querySelector('.p2')
const z1 = document.querySelector('.z1')
const z2 = document.querySelector('.z2')
const density1 = document.querySelector('.density1')
const dia1 = document.querySelector('.dia1')
const k1 = document.querySelector('.k1')
const length1 = document.querySelector('.length1')
const viscosity1 = document.querySelector('.viscosity1')
const calculateSinglePipeBtn = document.querySelector('.singlePipeSubmit')

singlePipeBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    singlePipePanel.style.transform = 'translateX(0)'
    singlePipePanel.style.transition = 'all 1s'
    doublePipePanel.style.transform = 'translateX(100%)'

})

doublePipeBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    singlePipePanel.style.transform = 'translateX(100%)'
    doublePipePanel.style.transform = 'translateX(0)'
    doublePipePanel.style.transition = 'all 1s'

})

calculateSinglePipeBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    const maxVelocity = `${Math.sqrt(2 * 9.81 * z1.value).toFixed(2)} m/s`
    alert(parseFloat(maxVelocity))
    if((parseFloat(maxVelocity)===NaN || parseFloat(maxVelocity)===undefined)){
        alert("the credentials are finding the max velocity undefined please your height z1")
        return
    }
    maxVelocitySinglePipeResult.textContent = maxVelocity
    const maxFlowRate = `${((parseFloat(maxVelocity) * 3.14 * dia1.value * dia1.value) / 4).toFixed(2)} m^3/s`
    maxFlowrateSinglePipeResult.textContent = maxFlowRate

    const constantCD1 = ((p1.value - p2.value) / (density1.value * 9.81) + (z1.value - z2.value) + Math.pow(v1.value,2)/(2 * 9.81)).toFixed(2)
    const constantM1V = ((1 + Number(k1.value)) / (19.62)).toFixed(2)
    const constantE1V = ((32 * viscosity1.value * length1.value) / (density1.value * 9.81 * Math.pow(dia1.value,2))).toFixed(2)
    const descriminant = Math.sqrt(Math.pow(constantE1V,2) + 4*constantM1V*constantCD1)
    if((parseFloat(descriminant)===NaN || parseFloat(descriminant)===undefined)){
        alert("the Provided credentials making the values imageniary please check credentials")
        return
    }
    const actualVelocitySinglePipe = ((Number(constantE1V)*-1 + Number(descriminant)) / (2 * constantM1V)).toFixed(2)
    const actualFlowRateSinglePipe =  `${((parseFloat(actualVelocitySinglePipe) * 3.14 * dia1.value * dia1.value) / 4).toFixed(2)} m^3/s`
    actualVelocitySINGLEPipe.textContent = `${actualVelocitySinglePipe} m/s`
    actualFlowRateSINGLEPipe.textContent = `${actualFlowRateSinglePipe}`

    const prevResult = {
        max_velocity : maxVelocity,
        max_flowrate : maxFlowRate,
        actual_velocity : actualVelocitySinglePipe,
        actual_flowrate : actualFlowRateSinglePipe
    }

    localStorage.setItem("max vel", prevResult.max_velocity)
    localStorage.setItem("act vel", prevResult.actual_velocity)
    localStorage.setItem("max flow", prevResult.max_flowrate)
    localStorage.setItem("act flow", prevResult.actual_flowrate)

})
const prevmaxVEL = localStorage.getItem("max vel")
const prevmaxFLOW = localStorage.getItem("max flow")
const prevactVEL = localStorage.getItem("act vel")
const prevactFLOW = localStorage.getItem("act flow")

prevMaxVel.textContent = `Maximum velocity : ${prevmaxVEL}`
prevMaxflow.textContent = `Maximum flow rate : ${prevmaxFLOW}`
prevActVel.textContent = `Actual velocity : ${prevactVEL}`
prevActflow.textContent = `Actual velocity : ${prevactFLOW}`
