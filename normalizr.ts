import { normalize, denormalize, schema } from "normalizr";

const blogpost = {
  id: "1",
  title: "My blog post",
  description: "Short blogpost description",
  content: "Hello world",
  author: {
    id: "1",
    name: "John Doe"
  },
  comments: [
    {
      id: "1",
      author: "Rob",
      content: "Nice post!"
    },
    {
      id: "2",
      author: "Jane",
      content: "I totally agree with you!"
    }
  ]
}

const authorSchema = new schema.Entity('authors')

const commentSchema = new schema.Entity('comments')

const postSchema = new schema.Entity('posts', {
  author: authorSchema,
  comments: [commentSchema]
});


/* ---------------------------------------------------------------------------------------- */
import util from 'util'

function print(object:any) {
  console.log(util.inspect(object, false, 12, true))
}

console.log(' ------------- OBJETO ORIGINAL --------------- ')
print(blogpost)
console.log(JSON.stringify(blogpost).length)


console.log(' ------------- OBJETO NORMALIZADO --------------- ')
const normalizedBlogpost = normalize(blogpost, postSchema);
print(normalizedBlogpost)
console.log(JSON.stringify(normalizedBlogpost).length)

console.log(' ------------- OBJETO DENORMALIZADO --------------- ')
const denormalizedBlogpost = denormalize(normalizedBlogpost.result, postSchema, normalizedBlogpost.entities);
print(denormalizedBlogpost)
console.log(JSON.stringify(denormalizedBlogpost).length)

// {
//   entities: {
//     authors: { '1': { id: '1', name: 'John Doe' } },
//     comments: {
//       '1': { id: '1', author: 'Rob', content: 'Nice post!' },
//       '2': { id: '2', author: 'Jane', content: 'I totally agree with you!' }
//     },
//     posts: {
//       '1': {
//         id: '1',
//           title: 'My blog post',
//             description: 'Short blogpost description',
//               content: 'Hello world',
//                 author: '1',
//                   comments: [ '1', '2' ]
//       }
//     }
//   },
//   result: '1'
// }