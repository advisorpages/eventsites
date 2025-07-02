module.exports = {
  content: [
    "./docs/**/*.html",
    "./event-pages/**/*.md",
    "./_includes/**/*.njk"
  ],
  safelist: [
    // Main theme colors
    'bg-pink-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500',
    'bg-orange-500', 'bg-teal-500', 'bg-red-500', 'bg-indigo-500',
    'bg-yellow-500', 'bg-cyan-500',

    // Matching form backgrounds
    'bg-pink-50', 'bg-blue-50', 'bg-green-50', 'bg-purple-50',
    'bg-orange-50', 'bg-teal-50', 'bg-red-50', 'bg-indigo-50',
    'bg-yellow-50', 'bg-cyan-50',

    // Text accents
    'text-pink-500', 'text-blue-500', 'text-green-500', 'text-purple-500',
    'text-orange-500', 'text-teal-500', 'text-red-500', 'text-indigo-500',
    'text-yellow-500', 'text-cyan-500',

    // Button hover
    'hover:bg-pink-500', 'hover:bg-blue-500', 'hover:bg-green-500',
    'hover:bg-purple-500', 'hover:bg-orange-500', 'hover:bg-teal-500',
    'hover:bg-red-500', 'hover:bg-indigo-500', 'hover:bg-yellow-500', 'hover:bg-cyan-500'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
