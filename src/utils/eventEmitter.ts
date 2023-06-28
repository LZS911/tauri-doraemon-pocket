/* eslint-disable @typescript-eslint/no-non-null-assertion */
import EmitterKey from '../common/emitterKey';

type EmitterFunction = (...args: any) => any;
class EventEmitter {
  private maxListeners = 10;
  private listeners = new Map<EmitterKey, EmitterFunction[]>();

  constructor() {
    this.maxListeners = 10;
  }

  addListener(eventName: EmitterKey, cb: EmitterFunction) {
    if (
      !this.listeners.has(eventName) ||
      !Array.isArray(this.listeners.get(eventName))
    ) {
      this.listeners.set(eventName, [cb]);
      if (eventName !== 'newListener') {
        this.emit('newListener');
      }
      return this;
    }
    if (this.listeners.get(eventName)!.length >= this.maxListeners) {
      console.error(
        'MaxListenersExceededWarning: Possible EventEmitter memory leak detected. %d event6 listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit',
        this.maxListeners
      );
    }

    this.listeners.set(eventName, [...this.listeners.get(eventName)!, cb]);

    return this;
  }

  removeListener(eventName: EmitterKey, listener: EmitterFunction) {
    const index = (this.listeners.get(eventName) || []).indexOf(listener);
    if (index !== -1) {
      this.listeners.set(
        eventName,
        this.listeners.get(eventName)!.splice(index, 1)
      );
      if (eventName !== 'removeListener') {
        this.emit('removeListener');
      }
    }
    return this;
  }

  emit(eventName: EmitterKey, ...args: any[]) {
    const isExistEvent =
      this.listeners.has(eventName) &&
      this.listeners.get(eventName)!.length > 0;

    if (isExistEvent) {
      this.listeners.get(eventName)!.forEach((cb) => {
        cb(...args);
      });
    }
    return isExistEvent;
  }

  once(eventName: EmitterKey, listener: EmitterFunction) {
    const fn = (...args: any[]) => {
      listener(...args);
      this.removeListener(eventName, fn);
    };
    this.addListener(eventName, fn);
    return this;
  }

  removeAllListeners(eventNames: EmitterKey[] = []) {
    if (eventNames.length === 0) {
      this.listeners = new Map<EmitterKey, EmitterFunction[]>();
    } else {
      eventNames.forEach((v: EmitterKey) => {
        this.listeners.set(v, null as any);
      });
    }
    return this;
  }

  listenerCount(eventName: EmitterKey) {
    return this.listeners.get(eventName)?.length ?? 0;
  }

  setMaxListeners(maxListeners: number) {
    this.maxListeners = maxListeners;
  }
  getMaxListeners() {
    return this.maxListeners;
  }
}

export default new EventEmitter();
