import Logger from '@code_blaster/logger';
import { exec } from 'child_process'

class Semaphore {
  constructor(max) {
    this.max = max;
    this.count = 0;
    this.queue = [];
  }

  async acquire() {
    if (this.count < this.max) {
      this.count++;
      return Promise.resolve();
    }

    return new Promise(resolve => this.queue.push(resolve));
  }

  release() {
    this.count--;
    if (this.queue.length > 0) {
      this.count++;
      const next = this.queue.shift();
      next();
    }
  }
}

const userCreationSemaphore = new Semaphore(1);

const execShellCommand = async (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, { timeout: 100000 }, (error, stdout, stderr) => {
      if (error || stderr) {
        reject(stderr || error.message);
      } else {
        resolve(stdout);
      }
    });
  });
};

const createUser = async (username, cpuLimit = '10000', memoryLimit = '500M') => {
  await userCreationSemaphore.acquire();
  try {
    const createUserCommand = `sudo useradd -m ${username} && echo '${username}:p' | sudo chpasswd`;
    await execShellCommand(createUserCommand);
    Logger.log(`User ${username} created successfully.`);
    const getUserIdCommand = `id -u ${username}`;
    const uid = await execShellCommand(getUserIdCommand);
    return uid.trim();
  } catch (error) {
    Logger.error(`Error creating user ${username}:`, error);
    throw error;
  } finally {
    userCreationSemaphore.release();
  }
};

const deleteUser = async (username) => {
  await userCreationSemaphore.acquire();
  try {
    const deleteUserCommand = `sudo userdel -f ${username}`;
    await execShellCommand(deleteUserCommand);
    Logger.log(`User ${username} deleted successfully.`);
  } catch (error) {
    Logger.error(`Error deleting user ${username}:`, error.message);
    throw error;
  } finally {
    userCreationSemaphore.release();
  }
};

const killProcessGroup = async (pgid) => {
  const killCommand = `sudo kill -TERM -${pgid}`;
  await execShellCommand(killCommand);
};

export { execShellCommand, createUser, deleteUser, killProcessGroup };