export default {
  name: 'normal workout',
  phases: [
    {
      label: 'Warm up',
      steps: [
        { color: '#f4a641', label: 'arm circle steps', time: 30 },
        { color: '#f4a641', label: 'reverse arm circle steps', time: 30 },
        { color: '#f4a641', label: 'high knee march', time: 30 },
        { color: '#f4a641', label: 'Jumping Jacks', time: 30 },
        { color: '#f4a641', label: 'up and outs', time: 30 },
        { color: '#f4a641', label: 'Boxer shuffle', time: 30 },
      ],
    },

    {
      label: 'get ready',
      steps: [{ color: '#f4a641', label: 'get ready', time: 30 }],
    },

    {
      label: 'phase 1',
      repeats: 3,
      steps: [
        { color: '#6ef442', label: 'Burpee', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'Mountain Climbers', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'Lunges', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'arch ups', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'squat', time: 30 },
        { color: '#f44741', label: 'Rest', time: 30 },
      ],
    },

    {
      label: 'Water Break',
      steps: [{ color: '#f4a641', label: 'Rest', time: 30 }],
    },

    {
      label: 'phase 2',
      repeats: 3,
      steps: [
        { color: '#6ef442', label: 'monkey walks', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'rotating planks', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'pike pushups', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'pushups', time: 30 },
        { color: '#f44741', label: 'Rest', time: 30 },
      ],
    },

    {
      label: 'Water Break',
      steps: [{ color: '#f4a641', label: 'Rest', time: 60 }],
    },

    {
      label: 'phase 3',
      repeats: 3,
      steps: [
        { color: '#6ef442', label: 'Plank', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'Side Plank', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'Side Plank Alt', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'Back Plank', time: 30 },
        { color: '#f44741', label: 'Rest', time: 30 },
      ],
    },

    {
      label: 'cool down',
      steps: [
        { color: '#f4a641', label: 'inner thigh reachovers', time: 30 },
        { color: '#f4a641', label: 'inner thigh reachovers alt', time: 30 },
        { color: '#f4a641', label: 'quad stretch', time: 30 },
        { color: '#f4a641', label: 'quad stretch alt', time: 30 },
        { color: '#f4a641', label: 'hamstring stretch', time: 30 },
        { color: '#f4a641', label: 'calf stretch', time: 30 },
        { color: '#f4a641', label: 'calf stretch alt', time: 30 },
      ],
    },
  ],
}
