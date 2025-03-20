import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { irr } from 'financial'

// Componentes
import { InvestForm } from "../components/InvestForm";
import { InvestResult } from '../components/InvestResults';
import { MyLineChart } from "../components/ChartSimple";

// Pagina de inversion
function Investment() {
 
  const { t } = useTranslation();
  const [tir, setTir] = useState([]);

  // Flujo de caja
  const cashFlows = [-1000, 300, 400, 500, 200, 300, 600, 500, 400, 300, 200, 100];
  // const cashFlows = [-5000000, 5000000, 2076500, 2076500, 7076500, 12076500, 18576500, 7439166];
  // const cashFlows = [5000000, 2076500, 2076500, 7076500, 12076500];

  useEffect(() => {
    getResults(cashFlows, setTir);
  }, []);

  return (
    <div>
      <InvestForm
        title={t("investment.title")}
        paragraph={t("investment.paragraph")}
      />
      <InvestResult
        title={t("investment.results")}
        paragraph={t("investment.here_are_the_results")}
        results={
          <>
            <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-cyan-50"><b>Cash Flows:</b> {cashFlows.join(", ")}</p>
            <p className="mx-auto mt-2 max-w-xl text-lg/8 text-pretty text-cyan-50"><b>TIR:</b> {tir.map(e => e + "%").join(", ")}</p>
          </>
        }
      />
      <MyLineChart results={cashFlows} dataName="CashFlows" />
      <MyLineChart results={tir} dataName="TIR (%)" />
    </div>
  )
}

export { Investment }

// FUNCIONES
function getResults(cashFlows, setTir) {

  // Calcular la TIR
  let results = [];
  for (let i = 0; i < cashFlows.length; i++) {
    let tir = irr(cashFlows.slice(0, i + 1));
    if (isNaN(tir) || tir === Infinity) {
      results.push(0);
      continue;
    }
    results.push(Number((tir * 100).toFixed(2)));
  }
  setTir(results)
}

