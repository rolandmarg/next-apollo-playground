/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'reflect-metadata';
import { Connection, getConnectionManager, ConnectionOptions } from 'typeorm';
import { User } from './entity/User';
import { CalendarEvent } from './entity/CalendarEvent';

const options: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DB_URI,
  synchronize: process.env.NODE_ENV !== 'production',
  entities: [User, CalendarEvent],
};

function entitiesChanged(prevEntities: any[], newEntities: any[]) {
  if (prevEntities.length !== newEntities.length) return true;

  for (let i = 0; i < prevEntities.length; i++) {
    if (prevEntities[i] !== newEntities[i]) return true;
  }

  return false;
}

async function updateConnectionEntities(
  connection: Connection,
  entities: any[]
) {
  if (!entitiesChanged(connection.options.entities as any[], entities)) return;

  // @ts-ignore
  connection.options.entities = entities;

  // @ts-ignore
  connection.buildMetadatas();

  if (connection.options.synchronize) {
    await connection.synchronize();
  }
}

export async function ensureConnection() {
  const connectionManager = getConnectionManager();

  if (connectionManager.has('default')) {
    const connection = connectionManager.get('default');

    if (!connection.isConnected) {
      return connection.connect();
    }

    if (process.env.NODE_ENV !== 'production') {
      await updateConnectionEntities(connection, options.entities as any[]);
    }

    return connection;
  }

  return connectionManager.create(options).connect();
}
