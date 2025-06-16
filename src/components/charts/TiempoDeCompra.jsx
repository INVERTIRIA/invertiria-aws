import { Legend, Label, XAxis, YAxis, CartesianGrid, Tooltip, Line, ResponsiveContainer, ComposedChart, Area, DefaultLegendContent, Brush } from 'recharts';

function TiempoDeCompra({ results, dataName }) {

    // Data para el gráfico
    const data = [
        { name: "01/2023", "Varianza": [580719993, 580719993], "Precio de inmueble": 580719993 },
        { name: "02/2023", "Varianza": [588350711, 592445488], "Precio de inmueble": 590401637 },
        { name: "03/2023", "Varianza": [597913393, 602079400], "Precio de inmueble": 600000000 },
        { name: "04/2023", "Varianza": [606348642, 612545519], "Precio de inmueble": 609454917 },
        { name: "05/2023", "Varianza": [617734599, 619796458], "Precio de inmueble": 618766386 },
        { name: "06/2023", "Varianza": [626913616, 628953550], "Precio de inmueble": 627934410 },
        { name: "07/2023", "Varianza": [636958986, 636958986], "Precio de inmueble": 636958986 },
        { name: "08/2023", "Varianza": [644813035, 646865569], "Precio de inmueble": 645840116 },
        { name: "09/2023", "Varianza": [653563718, 655590314], "Precio de inmueble": 654577799 },
        { name: "10/2023", "Varianza": [662878598, 662878598], "Precio de inmueble": 662878598 },
        { name: "11/2023", "Varianza": [669826659, 671700748], "Precio de inmueble": 670764357 },
        { name: "12/2023", "Varianza": [677355128, 679155335], "Precio de inmueble": 678255828 },
        { name: "01/2024", "Varianza": [684163343, 685831946], "Precio de inmueble": 684998152 },
        { name: "02/2024", "Varianza": [688084036, 694035690], "Precio de inmueble": 691066243 },
        { name: "03/2024", "Varianza": [695840108, 697214265], "Precio de inmueble": 696527525 },
        { name: "04/2024", "Varianza": [698968474, 703908219], "Precio de inmueble": 701442680 },
        { name: "05/2024", "Varianza": [704737082, 706993754], "Precio de inmueble": 705866318 },
        { name: "06/2024", "Varianza": [708336817, 711430687], "Precio de inmueble": 709885434 },
        { name: "07/2024", "Varianza": [711772906, 715806450], "Precio de inmueble": 713792519 },
        { name: "08/2024", "Varianza": [717100370, 718074446], "Precio de inmueble": 717587573 },
    ];

    // Punto personalizado
    const CustomizedDot = (props) => {
        const { cx, cy, stroke, payload, value } = props;

        if (payload.name === "03/2023") {
            return (
                <svg x={cx - 10} y={cy - 10} width={20} height={20} viewBox="0 0 120 120" fill='#FB3D03'>
                    <circle cx="60" cy="60" r="50" />
                </svg>
            );
        }
    };

    // Leyenda
    const renderLegendWithoutRange = ({ payload, content, ...rest }) => {
        const newPayload = payload.filter((x) => x.dataKey !== "a");
        return <DefaultLegendContent payload={newPayload} {...rest} />;
    }

    return (
        <div className='pb-30 pt-10 w-full px-5'>
            <h1 className='text-center text-black text-4xl font-bold pb-15'>{dataName}</h1>
            <div className="w-[70%] h-[60vh] px-5 flex justify-center items-center">
                <ResponsiveContainer>
                    <ComposedChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 10,
                            right: 80,
                            left: 80,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name">
                            <Label value="Pages of my website" offset={20} position="bottom" />
                        </XAxis>
                        <YAxis domain={[580719993, 710719993]} ticks={[
                            580719993,
                            600719993,
                            620719993,
                            640719993,
                            660719993,
                            680719993,
                            700719993
                        ]} />
                        <Tooltip />
                        <Area
                            dataKey="Varianza"
                            stroke="none"
                            fill="#aaaaaa"
                            connectNulls
                            dot={false}
                            activeDot={true}
                        />
                        <Line dataKey="Precio de inmueble" stroke="#FC7300" connectNulls dot={<CustomizedDot />} />
                        <Legend content={renderLegendWithoutRange} />
                        <Brush dataKey="name" height={40} stroke="#FC7300" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export { TiempoDeCompra }