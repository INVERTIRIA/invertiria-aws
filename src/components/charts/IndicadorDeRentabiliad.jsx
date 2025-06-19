import { PieChart, Pie, Cell } from 'recharts';

const RADIAN = Math.PI / 180;
const data = [
  { name: 'MAX', value: 100 },
];
const cx = 90;
const cy = 90;
const iR = 50;
const oR = 90;

const needle = (value, data, cx, cy, iR, oR, color) => {
  let total = 0;
  data.forEach((v) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle key="needle-base" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path key="needle" d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
  ];
};

function IndicadorDeRentabiliad({ value }) {
  return (
    <PieChart width={200} height={120}>

      <defs>
        <linearGradient id="gradienteVelocimetro" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f00000" />
          <stop offset="50%" stopColor="#fff200" />
          <stop offset="100%" stopColor="#00ab09" />
        </linearGradient>
      </defs>

      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={iR}
        outerRadius={oR}
        fill="url(#gradienteVelocimetro)"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} />
        ))}
      </Pie>
      {needle(value, data, cx, cy, iR, oR, '#000000')}
    </PieChart>
  );
}

export { IndicadorDeRentabiliad }
