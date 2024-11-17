const API_URL = process.env.NEXT_PUBLIC_API_BACKEND;

const fetchTypesApi = async (page: number) => {
  const response = await fetch(`${API_URL}/type?page=${page}`);
  if (!response.ok) throw new Error("Failed to fetch types");
  const json = await response.json();
  return json;
};

const addTypeApi = async (type: { type: string }) => {
  const response = await fetch(`${API_URL}/type`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(type),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to add type");
  }

  return await response.json();
};

const fetchTypeByIdApi = async (id: string) => {
  const response = await fetch(`${API_URL}/type/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch type");
  }
  return await response.json();
};

const updateTypeApi = async (payload: { id: string; type: string }) => {
  const response = await fetch(`${API_URL}/type/${payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: payload.type }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update type");
  }
  return await response.json();
};

const deleteTypeApi = async (id: string) => {
  const response = await fetch(`${API_URL}/type/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete type");
  const json = await response.json();
  return json;
};

export const typeApi = {
  fetchTypesApi,
  addTypeApi,
  fetchTypeByIdApi,
  updateTypeApi,
  deleteTypeApi,
};
