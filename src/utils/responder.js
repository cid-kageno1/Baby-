export function replyFromMemory(memory, msg) {
  return memory[msg] || null;
}

export function teachMemory(memory, msg, reply) {
  memory[msg] = reply;
  return memory;
}
