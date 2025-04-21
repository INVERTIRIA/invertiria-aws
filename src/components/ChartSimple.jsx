import React from 'react';

// Componentes
import { LineChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Line, ResponsiveContainer } from 'recharts';

// Ejemplo de datos
const data = [
    { name: 'Enero', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Febrero', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Marzo', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Abril', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Mayo', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Junio', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Julio', uv: 3490, pv: 4300, amt: 2100 },
];

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function MyLineChart({ results, dataName }) {

    // Data para el gráfico
    let data = [];
    for (let i = 0; i < results.length; i++) {
        data.push({ name: months[i], [dataName]: results[i] },);
    }

    return (
        <div className='bg-black pb-30'>
            <h1 className='text-center text-white text-4xl font-bold pb-5'>{dataName}</h1>
            <div className="w-full h-[50vh] flex justify-center items-center">
                <ResponsiveContainer>
                    <LineChart
                        data={data}
                        margin={{ top: 5, right: 50, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey={dataName} stroke="#FC7300" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export { MyLineChart }