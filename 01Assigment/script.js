const marksMass = 95;
const marksHeight = 1.88;
const marksBMI = marksMass / (marksHeight ** 2);

const johnsMass = 85;
const johnsHeight = 1.76;
const johnsBMI = johnsMass / (johnsHeight ** 2);

const markHigherBMI = (marksBMI > johnsBMI);

console.log(`Mark has higher BMI: ${markHigherBMI}`);

if (markHigherBMI) console.log(`Mark's BMI (${marksBMI}) is higher than John's (${johnsBMI})`);
else console.log(`John's (${johnsBMI}) is higher than Mark's BMI (${marksBMI})`);