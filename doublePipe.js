const density = document.querySelector(".density2");
const dia1pipe1 = document.querySelector(".dia1pipe1");
const dia1pipe2 = document.querySelector(".dia1pipe2");
const dia1pipe2MAIN = document.querySelector(".dia1pipe2MAIN");
const V1 = document.querySelector(".v1Pipe2");
const P1 = document.querySelector(".p1pipe2");
const P3 = document.querySelector(".p2pipe2");
const Z1 = document.querySelector(".z1pipe2");
const Z3 = document.querySelector(".z3pipe2");
const Z4 = document.querySelector(".z4pipe2");
const K1 = document.querySelector(".k1pipe2");
const K2 = document.querySelector(".k2pipe2");
const length = document.querySelector(".length1pipe2");
const viscosity = document.querySelector(".viscosity1pipe2");
const calculateV2FOR2PIPEBTN = document.querySelector(".doublePipeSubmit");

const resultVelocityV3Value = document.querySelector(".actVelDoublePipe");
const resultVelocityV4Value = document.querySelector(".actualDoublePipeVel");
const resultFlowF3Value = document.querySelector(".actFlowDoublePipe");
const resultFlowF4Value = document.querySelector(".actualDoublePipeFlow");

const prev_act_vel1 = document.querySelector(".prev_act_vel1");
const prev_act_vel2 = document.querySelector(".prev_act_vel2");
const prev_act_flow1 = document.querySelector(".prev_act_flow1");
const prev_act_flow2 = document.querySelector(".prev_act_flow2");

function calculatingV2(height) {
  const v2MAX = Math.sqrt(2 * 9.81 * height);
  if ((parseFloat(v2MAX) === NaN || parseFloat(v2MAX) === undefined)) {
    alert(
      "the Provided credentials making the values imageniary please check credentials"
    );
    return;
  }
  return v2MAX;
}

function calculatingEV(dia1, dia2, viscosity, length, density) {
  const diaS1 = Math.pow(dia1, 2);
  const diaS2 = Math.pow(dia2, 2);

  const constantEV1 = (32 * viscosity * length) / (density * 9.81 * diaS1);
  const constantEV2 = (32 * viscosity * length) / (density * 9.81 * diaS2);

  return [constantEV1, constantEV2];
}

function calculatingMV(arrayOfK) {
  const [k1, k2] = arrayOfK;
  const M1 = (1 + Number(k1)) / 19.62;
  const M2 = (1 + Number(k2)) / 19.62;
  return [M1, M2];
}

function calculatingCV(
  viscosity,
  dia,
  density,
  length,
  v1,
  z1,
  z3,
  z4,
  p3,
  p1
) {
  const f = (64 * viscosity) / (density * v1 * dia);
  const v2FACTOR = (f * length) / (19.62 * dia) + 1 / 19.62;
  const CV1 =
    Number(Math.pow(v1, 2) * v2FACTOR) -
    Number(Math.pow(v1, 2) / 19.62) +
    (Number(z3) - Number(z1)) +
    Number((p3 - p1) / (density * 9.81));
  const CV2 =
    Number(Math.pow(v1, 2) * v2FACTOR) -
    Number(Math.pow(v1, 2) / 19.62) +
    (Number(z4) - Number(z1)) +
    Number((p3 - p1) / (density * 9.81));
  return [CV1, CV2];
}

function calculatingVEL(
  density,
  dia1pipe1,
  dia1pipe2,
  V1,
  P1,
  P3,
  Z1,
  Z3,
  Z4,
  K1,
  K2,
  length,
  viscosity,
  dia1pipe2MAIN
) {
  const [EV1, EV2] = calculatingEV(
    Number(dia1pipe1),
    Number(dia1pipe2),
    Number(viscosity),
    Number(length),
    Number(density)
  );
  const [MV1, MV2] = calculatingMV([Number(K1), Number(K2)]);
  const V = calculatingV2(Number(Z1));
  const [CV1, CV2] = calculatingCV(
    Number(viscosity),
    Number(dia1pipe2MAIN),
    Number(density),
    Number(length),
    Number(V),
    Number(Z1),
    Number(Z3),
    Number(Z4),
    Number(P3),
    Number(P1)
  );
  const desc1 =
    Math.pow(Number(EV1), 2) - Number(4 * Number(MV1) * Number(CV1));
  const VEL3 =
    Number(Number(EV1)) * -1 + Math.sqrt(Number(desc1)) / (2 * Number(MV1));
  if ((parseFloat(VEL3) === NaN || parseFloat(VEL3) === undefined)) {
    alert(
      "the Provided credentials making the values imageniary please check credentials"
    );
    return;
  }
  const desc2 =
    Math.pow(Number(EV2), 2) - Number(4 * Number(MV2) * Number(CV2));
  const VEL4 =
    Number(Number(EV2)) * -1 + Math.sqrt(Number(desc2)) / (2 * Number(MV2));
  if ((parseFloat(VEL4) === NaN || parseFloat(VEL4) === undefined)) {
    alert(
      "the Provided credentials making the values imageniary please check credentials"
    );
    return;
  }
  return [Number(VEL3), Number(VEL4)];
}

calculateV2FOR2PIPEBTN.addEventListener("click", (e) => {
  e.preventDefault();
  const [V3, V4] = calculatingVEL(
    density.value,
    dia1pipe1.value,
    dia1pipe2.value,
    V1.value,
    P1.value,
    P3.value,
    Z1.value,
    Z3.value,
    Z4.value,
    K1.value,
    K2.value,
    length.value,
    viscosity.value,
    dia1pipe2MAIN.value
  );
  alert(length.value)
  resultVelocityV3Value.textContent = `${V3.toFixed(2)} m/s`;
  resultVelocityV4Value.textContent = `${V4.toFixed(2)} m/s`;
  const F3 = (((3.14 * dia1pipe1.value * dia1pipe1.value) / 4) * V3).toFixed(2);
  const F4 = (((3.14 * dia1pipe1.value * dia1pipe1.value) / 4) * V4).toFixed(2);

  resultFlowF3Value.textContent = `${F3} m^3/s`;
  resultFlowF4Value.textContent = `${F4} m^3/s`;
  localStorage.setItem("V3Prev", V3.toFixed(2));
  localStorage.setItem("V4Prev", V4.toFixed(2));
  localStorage.setItem("F3Prev", F3);
  localStorage.setItem("F4Prev", F4);
});

prev_act_vel1.textContent = `Actual velocity at outer pipe 1 : ${localStorage.getItem(
  "V3Prev"
)} m/s`;
prev_act_vel2.textContent = `Actual velocity at outer pipe 2 : ${localStorage.getItem(
  "V4Prev"
)} m/s`;
prev_act_flow1.textContent = `Actual Flow rate at outer pipe 1 : ${localStorage.getItem(
  "F3Prev"
)} m^3/s`;
prev_act_flow2.textContent = `Actual Flow rate at outer pipe 2 : ${localStorage.getItem(
  "F4Prev"
)} m^3/s`;
