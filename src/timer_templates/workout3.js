export default {
  name: 'jump rope workout',
  phases: [
    {
      label: 'get ready',
      steps: [{ color: '#f4a641', label: 'get ready', time: 30 }],
    },

    {
      label: 'phase 1 - bands',
      repeats: 10,
      steps: [
        { color: '#6ef442', label: 'jump', time: 30 },
        { color: '#f44741', label: 'Rest', time: 30 },
      ],
    },
  ],
}
