import { useLanguage } from "../../../context/LanguageProvider";
import LoadingScreen from "../components/loading";

export const UserInviteEarn = () => {
  const { t } = useLanguage();
  if (!t) return <LoadingScreen />;
  return (
    <div className="brands container mx-auto my-2 overflow-hidden mt-16">
      <p className="text-4xl font-bold">{t("inviteRules")}</p>
      <p className="my-8">
        1.{t("inviteRulesDesc1")}
        <br />
        1:{t("inviteRulesDesc11")}
        <br />
        2: {t("inviteRulesDesc12")}
        <br />
        3: {t("inviteRulesDesc13")}
        <br />
        2. {t("inviteRulesDesc2")}
        <br />
        3. {t("inviteRulesDesc3")}
        <br />
        4. {t("inviteRulesDesc4")}
      </p>
    </div>
  );
};
