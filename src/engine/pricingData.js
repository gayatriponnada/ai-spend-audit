export const TOOLS = [
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'coding',
    plans: [
      { id: 'hobby', name: 'Hobby', pricePerSeat: 0, description: 'Free' },
      { id: 'pro', name: 'Pro', pricePerSeat: 20, description: '$20/user/month' },
      { id: 'business', name: 'Business', pricePerSeat: 40, description: '$40/user/month' },
      { id: 'enterprise', name: 'Enterprise', pricePerSeat: 100, description: 'Custom' },
    ]
  },
  {
    id: 'github_copilot',
    name: 'GitHub Copilot',
    category: 'coding',
    plans: [
      { id: 'individual', name: 'Individual', pricePerSeat: 10, description: '$10/user/month' },
      { id: 'business', name: 'Business', pricePerSeat: 19, description: '$19/user/month' },
      { id: 'enterprise', name: 'Enterprise', pricePerSeat: 39, description: '$39/user/month' },
    ]
  },
  {
    id: 'claude',
    name: 'Claude',
    category: 'mixed',
    plans: [
      { id: 'free', name: 'Free', pricePerSeat: 0, description: 'Free' },
      { id: 'pro', name: 'Pro', pricePerSeat: 20, description: '$20/user/month' },
      { id: 'max', name: 'Max', pricePerSeat: 100, description: '$100/user/month' },
      { id: 'team', name: 'Team', pricePerSeat: 30, description: '$30/user/month' },
      { id: 'enterprise', name: 'Enterprise', pricePerSeat: 60, description: 'Custom' },
    ]
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'mixed',
    plans: [
      { id: 'free', name: 'Free', pricePerSeat: 0, description: 'Free' },
      { id: 'plus', name: 'Plus', pricePerSeat: 20, description: '$20/user/month' },
      { id: 'team', name: 'Team', pricePerSeat: 30, description: '$30/user/month' },
      { id: 'enterprise', name: 'Enterprise', pricePerSeat: 60, description: 'Custom' },
    ]
  },
  {
    id: 'gemini',
    name: 'Gemini',
    category: 'mixed',
    plans: [
      { id: 'free', name: 'Free', pricePerSeat: 0, description: 'Free' },
      { id: 'pro', name: 'Pro', pricePerSeat: 20, description: '$20/user/month' },
      { id: 'ultra', name: 'Ultra', pricePerSeat: 30, description: '$30/user/month' },
    ]
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    category: 'coding',
    plans: [
      { id: 'free', name: 'Free', pricePerSeat: 0, description: 'Free' },
      { id: 'pro', name: 'Pro', pricePerSeat: 15, description: '$15/user/month' },
      { id: 'teams', name: 'Teams', pricePerSeat: 30, description: '$30/user/month' },
    ]
  },
]

export const USE_CASES = [
  { id: 'coding', name: 'Coding / Development' },
  { id: 'writing', name: 'Writing / Content' },
  { id: 'data', name: 'Data Analysis' },
  { id: 'research', name: 'Research' },
  { id: 'mixed', name: 'Mixed / General' },
]