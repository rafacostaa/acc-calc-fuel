export const calcFuel = (values, setState, state) => {
  const newValues = {
    ...values,
    laptime: values.laptime?.format("HH:mm:ss"),
  };
  const { laptime, raceDuration, average } = newValues;
  const newAverage = average.replace(",", ".");
  if (state.typeRaceDuration === "min") {
    const newLaptime = laptime.split(":");
    // 1min = 60000milisegundos
    // 1seg = 1000milisegundos
    const newLaptime2 =
      newLaptime[0] * 60000 + newLaptime[1] * 1000 + newLaptime[2] * 10;
    const newRaceDuration = raceDuration * 60000;
    setState({
      ...state,
      resultTotalLaps: newRaceDuration / newLaptime2,
      fillFuel: (newRaceDuration / newLaptime2) * newAverage,
    });
    console.log("result total laps", newRaceDuration / newLaptime2);
    console.log("fill fuel", (newRaceDuration / newLaptime2) * newAverage);
  } else {
    console.log("====================================");
    console.log(values);
    console.log("====================================");
    setState({
      ...state,
      resultTotalLaps: 0,
      fillFuel: raceDuration * newAverage,
    });
  }
};
