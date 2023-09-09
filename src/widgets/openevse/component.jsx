import { useTranslation } from "next-i18next";

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { t } = useTranslation();

  const { widget } = service;

  // API docs: https://openevse.stoplight.io/docs/openevse-wifi-v4/dba95e8966593-get-the-evse-status
  const { data, error } = useWidgetAPI(widget, null, {
    refreshInterval: 60000
  });

  if (error) {
    return <Container service={service} error={error} />;
  }

  if (!data) {
    return (
      <Container service={service}>
        <Block label="openevse.vehicle" />
        <Block label="openevse.power" />
        <Block label="openevse.energy_session" />
        <Block label="openevse.energy_month" />
      </Container>
    );
  }

  return (
    <Container service={service}>
      <Block label="openevse.vehicle" value={data.vehicle == 1 ? t("openevse.vehicle_connected") : t("openevse.vehicle_none")} />
      <Block label="openevse.power" value={`${t("common.number", { value: data.power })} ${t("openevse.watt")}`} />
      <Block label="openevse.energy_session" value={`${t("common.number", { value: data.session_energy })} ${t("openevse.watt_hour")}`} />
      <Block label="openevse.energy_month" value={`${t("common.number", { value: data.total_month })} ${t("openevse.kilowatt_hour")}`} />
    </Container>
  );
}
