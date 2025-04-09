export const formatMatchDate = (dateString?: string) => {
  if (!dateString) return "Data não definida";

  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatHourMatchDate = (dateString?: string) => {
  if (!dateString) return "Data não definida";
  const date = new Date(dateString);
  return new Date(date).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
