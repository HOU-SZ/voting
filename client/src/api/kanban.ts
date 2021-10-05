import { createAPIEndpoint } from './index';

// Topic Api
export function fetchTopic(topicId: string) {
  return createAPIEndpoint('topics').fetchById(topicId)
}

// Columns Api group
export function fetchColumns(topicId: string) {
  return createAPIEndpoint('column').fetchById(topicId)
}

export function createColumn(topicId: string, columnName: string) {
  return createAPIEndpoint('column').create({
    topicId,
    columnName,
  })
}

export function updateColumn(topicId: string, columnId: string, columnName: string) {
  return createAPIEndpoint('column').update({
    columnId,
    topicId,
    columnName,
  })
}

export function delColumn(columnId: string) {
  return createAPIEndpoint('column').delete(columnId)
}

// Ideas Api group
export function fetchTopicIdea(topicId: string) {
  return createAPIEndpoint('ideas/topic').fetchById(topicId)
}

export function fetchColumnIdea(columnId: string) {
  return createAPIEndpoint('ideas/column').fetchById(columnId)
}

export function updateColumnIdea(columnId: string, ideaId: string) {
  return createAPIEndpoint('ideas/column').update({
    columnId,
    ideaId,
  })
}

export function fetchIdea(ideaId: string) {
  return createAPIEndpoint('ideas').fetchById(ideaId)
}

export function createIdea(topicId: string, columnId: string, description: string) {
  return createAPIEndpoint('ideas').create({
    topicId,
    columnId,
    description
  })
}

export function updateIdea(ideaId: string, description: string) {
  return createAPIEndpoint('ideas').update({
    ideaId,
    description
  })
}

export function delIdea(ideaId: string) {
  return createAPIEndpoint('ideas').delete(ideaId)
}

// likes
export function fetchIdeaLikes(ideaId: string) {
  return createAPIEndpoint('likes').fetchById(ideaId)
}

export function createIdeaLikes(columnId: string, topicId: string, ideaId: string) {
  return createAPIEndpoint('likes').create({
    columnId,
    topicId,
    ideaId,
  })
}

export function delIdeaLikes(likeId: string) {
  return createAPIEndpoint('likes').delete(likeId)
}

export function unregisters() {
  return createAPIEndpoint('unregisters').create()
}

export function unregistersTokenRefresh() {
  return createAPIEndpoint('unregisters/tokenRefresh').create()
}

export function createUnregistersToken(token?: string){
  return createAPIEndpoint('unregisters/autoGenerate').create(token)
}