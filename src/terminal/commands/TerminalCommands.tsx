interface TerminalCommandsInterface {
  command: string[];
  handleAutoComplete: (arg: string, position: number) => Promise<string[]>;
}

class TerminalCommands {
  private static readonly commands: TerminalCommandsInterface[] = [
    {
      command: ["ls"],
      handleAutoComplete: async () => ["-a", "-l", "-al"],
    },
    {
      command: ["cd"],
      handleAutoComplete: async () => ["~", "/"],
    },
    {
      command: ["mkdir"],
      handleAutoComplete: async () => [],
    },
    {
      command: ["touch"],
      handleAutoComplete: async () => [],
    },
    {
      command: ["rm"],
      handleAutoComplete: async () => [],
    },
    {
      command: ["mv"],
      handleAutoComplete: async () => [],
    },
    {
      command: ["cp"],
      handleAutoComplete: async () => [],
    },
    {
      command: ["clear"],
      handleAutoComplete: async () => [],
    },
    {
      command: ["echo"],
      handleAutoComplete: async () => [],
    },
    {
      command: ["cat"],
      handleAutoComplete: async () => [],
    },
    {
      command: ["grep"],
      handleAutoComplete: async () => [],
    },
    {
      command: ["find"],
      handleAutoComplete: async () => [],
    },
  ];

  public static getCommands(): TerminalCommandsInterface[] {
    return this.commands;
  }
}
