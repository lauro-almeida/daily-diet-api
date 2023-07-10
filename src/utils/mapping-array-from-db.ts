export async function mappingArrayFromDB(
  maxDaysOnDiet: { is_inside_the_diet: boolean }[],
) {
  const insideTheDietValues = maxDaysOnDiet.map((item) => {
    let container = []

    container = item.is_inside_the_diet

    return container
  })

  let maximumDaysOnDiet = 0
  let maxLocal = 0

  for (let i = 0; insideTheDietValues.length > i; i++) {
    insideTheDietValues[i] ? (maxLocal += 1) : (maxLocal = 0)

    if (maxLocal > maximumDaysOnDiet) {
      maximumDaysOnDiet = maxLocal
    }
  }

  return maximumDaysOnDiet
}
