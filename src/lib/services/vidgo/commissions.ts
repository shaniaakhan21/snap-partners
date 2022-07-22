interface IQueryReturn {
  data: [];
  error: {
    status: number;
    info: string;
  };
}

export const commissions = async (token: string): Promise<IQueryReturn> => {
  const res = await fetch('/api/vidgo/commissions', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await res.json()

  if (!res.ok) {
    return {
      data: null,
      error: {
        status: res.status,
        info: data.error
      }
    }
  }

  return {
    data: data.data,
    error: null
  }
}
