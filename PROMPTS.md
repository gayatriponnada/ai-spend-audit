# Prompts Used

## AI Audit Summary Prompt

### The prompt:
"You are an AI spend analyst. A startup team has completed
an AI tool audit. Write a friendly, personalized 80-100 word
summary paragraph. Be specific about their savings and top
recommendation. Be encouraging but honest. Do not use bullet
points — write in flowing prose only."

### Why I wrote it this way:
- Giving a clear role ("AI spend analyst") improves accuracy
- Specifying word count keeps output concise for the UI
- "Flowing prose only" prevents bullet points breaking the UI layout
- "Be honest" prevents the model from manufacturing fake positivity

### What I tried that didn't work:
- Without the role context, summaries were too generic
- Without word limit, output was too long for the card UI
- Asking for "encouraging" without "honest" gave unrealistic summaries

### Fallback:
If the API call fails or returns an error, a template-based
fallback summary is shown using the same audit data.