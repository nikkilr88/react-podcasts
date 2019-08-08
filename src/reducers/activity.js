const initialState = [
  {
    img:
      'https://is4-ssl.mzstatic.com/image/thumb/Music113/v4/60/4e/d6/604ed6ba-6a5a-5faa-edf5-189a290f3aa3/source/100x100bb.jpg',
    podcast: 'Syntax - Tasty Web Development Treats',
    episode: 'Blogging'
  },
  {
    img:
      'https://is4-ssl.mzstatic.com/image/thumb/Music113/v4/60/4e/d6/604ed6ba-6a5a-5faa-edf5-189a290f3aa3/source/100x100bb.jpg',
    podcast: 'Syntax - Tasty Web Development Treats',
    episode: 'Hasty Treat - VSCode Love Part 3'
  }
]

const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default activityReducer
