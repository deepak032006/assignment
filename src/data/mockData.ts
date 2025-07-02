// src/data/mockData.ts

export type MockDataType = {
  id: number
  name: string
  status: string
  score: number
}

export const mockData: MockDataType[] = [
  { id: 1, name: 'Alice', status: 'Active', score: 88 },
  { id: 2, name: 'Bob', status: 'Inactive', score: 74 },
  { id: 3, name: 'Charlie', status: 'Active', score: 92 },
  { id: 4, name: 'Dana', status: 'Pending', score: 65 },
]
