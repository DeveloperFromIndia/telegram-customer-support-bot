import type { UserDto } from "@/dto/user.dto";

const clientView = (
  data: any,
  t: (key: string) => string
) => {
  return `
${data.blocked ? "🟥" : "🟩"} ${t("user_field_id")} ${data.id} 
${t("user_field_id_in_crm")} ${data.idInCRM}

${t("user_field_username")} @${data.username}
${t("user_field_name")} ${data.name}
${t("user_field_phone")} ${data.phone}
  `;
};

export default clientView;