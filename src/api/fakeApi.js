const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export async function fetchMockData() {
  // задержка как будто сервер думает
  await sleep(1200);

  const res = await fetch("/mock/db.json");
  if (!res.ok) throw new Error("Не удалось загрузить JSON");

  return res.json();
}
