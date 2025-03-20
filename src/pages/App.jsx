import { useTranslation } from 'react-i18next';

// Componentes
import { CTASection } from "../components/CTASection";

// Pagina principal
function App() {

  const { t } = useTranslation();
  
  return (
    <CTASection
      title={t("invertiria.title")}
      paragraph={t("invertiria.paragraph")}
      buttonText={t("invertiria.getStarted")}
      buttonLink="/investment"
      buttonText2={t("invertiria.learnMore")}
    />
  )
}

export { App }
