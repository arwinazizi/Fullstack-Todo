import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { MongoClient } from 'mongodb';
import * as tasksModel from './tasksModel';

let db;
let client;

beforeAll(async () => {
  client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  db = client.db('taskdb_test'); // ✅ make sure this matches exactly
  await db.collection('tasks').deleteMany({}); // clean test data
});

afterAll(async () => {
  await client.close();
});

describe('Task Model', () => {
  it('should insert a task', async () => {
    const task = { title: 'Test task' };
    const result = await tasksModel.addTask(db, task);

    expect(result).toHaveProperty('title', 'Test task');
  });

  it('should retrieve tasks', async () => {
    const tasks = await tasksModel.getTasks(db);
    expect(Array.isArray(tasks)).toBe(true);
  });
});
