export default {
  name: 'pull workout',
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
      label: 'phase 1 - bands',
      repeats: 3,
      steps: [
        { color: '#6ef442', label: 'archer pulls', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'archer pulls alt', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'overheads', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'reverse overheads', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'upward pulls', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'upward pulls alt', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'cross rotations', time: 30 },
        { color: '#f44741', label: 'Rest', time: 30 },
      ],
    },

    {
      label: 'Water Break',
      steps: [{ color: '#f4a641', label: 'Rest', time: 30 }],
    },

    {
      label: 'phase 2 - legs',
      repeats: 2,
      steps: [
        { color: '#6ef442', label: 'high knees', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'jumping lunges', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'burpee', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'pop squat', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'alternating side lunge', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'squat jack', time: 20 },
        { color: '#f44741', label: 'Rest', time: 30 },
      ],
    },

    {
      label: 'Water Break',
      steps: [{ color: '#f4a641', label: 'Rest', time: 60 }],
    },

    {
      label: 'phase 3 - core',
      repeats: 3,
      steps: [
        { color: '#6ef442', label: 'Plank', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'Russian twists', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'arch ups', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'Back Plank', time: 30 },
        { color: '#f44741', label: 'Rest', time: 10 },
        { color: '#6ef442', label: 'wall handstands', time: 45 },
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
