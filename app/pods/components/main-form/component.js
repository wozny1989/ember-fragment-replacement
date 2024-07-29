/* eslint-disable ember/no-tracked-properties-from-args */
/* eslint-disable ember/no-runloop */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

import { Changeset } from 'ember-changeset';
import Validation from 'ember-fragment-replacement/pods/post/validation';
import lookupValidator from 'ember-changeset-validations';
import { next } from '@ember/runloop';
import { graphviz } from 'd3-graphviz';
import graphlib from 'graphlib';

const definition = {
  initial: 'UNlMJ',
  states: {
    UNlMJ: {
      type: 'compound',
      initial: 'VnGHR',
      meta: {
        position: 0,
      },
      states: {
        VnGHR: {
          type: 'default',
          onDone: 'lngbF',
          meta: {
            position: 0,
            title: {
              base: 'Create Task :)',
            },
            actionType: 'completeTask',
            actionParams: {
              type: 'default',
              title: {
                type: 'value',
                value: 'Task One',
              },
              description: {
                type: 'value',
                value: 'Some desc',
              },
              due: {
                type: 'value',
                value: '2024-07-30T22:00:00.000Z',
              },
              owner: {
                type: 'value',
                value: '5b226d4534a563a31e86cef9',
              },
            },
          },
        },
        lngbF: {
          type: 'parallel',
          meta: {
            position: 1,
            title: {
              base: 'My parallel state!',
            },
          },
          states: {
            AyHIT: {
              type: 'compound',
              initial: 'EJfsy',
              meta: {
                position: 0,
              },
              states: {
                EJfsy: {
                  type: 'default',
                  onDone: 'final',
                  meta: {
                    position: 0,
                    title: {
                      base: 'Parallel Complete Task 1',
                    },
                    actionType: 'completeTask',
                    actionParams: {
                      type: 'default',
                      title: {
                        type: 'value',
                        value: 'Parallel Task 1',
                      },
                      description: {
                        type: 'value',
                        value: 'Some desc.',
                      },
                      due: {
                        type: 'value',
                        value: '2024-07-23T22:00:00.000Z',
                      },
                      owner: {
                        type: 'value',
                        value: '5b226d4534a563a31e86cef9',
                      },
                    },
                  },
                },
              },
              onDone: 'WpLGo',
            },
            WpLGo: {
              type: 'compound',
              initial: 'yTYLg',
              meta: {
                position: 1,
              },
              states: {
                yTYLg: {
                  type: 'default',
                  onDone: 'final',
                  meta: {
                    position: 0,
                    title: {
                      base: 'Parallel Complete Task 2',
                    },
                    actionType: 'completeTask',
                    actionParams: {
                      type: 'default',
                      title: {
                        type: 'value',
                        value: 'Parallel Task 2',
                      },
                      description: {
                        type: 'value',
                        value: 'Some desc..',
                      },
                      due: {
                        type: 'value',
                        value: '2024-07-18T22:00:00.000Z',
                      },
                      owner: {
                        type: 'value',
                        value: '5b226d4534a563a31e86cef9',
                      },
                    },
                  },
                },
              },
              onDone: 'final',
            },
          },
          onDone: 'final',
        },
      },
      onDone: 'final',
    },
  },
};

function addStates(graph, parent, states) {
  Object.keys(states).forEach((stateId) => {
    const state = states[stateId];

    graph.setNode(stateId, { ...state, id: stateId });

    if (parent) {
      graph.setParent(stateId, parent);
    } else {
      graph.setNode('start', {
        id: 'start',
        type: 'default',
        meta: { title: { base: 'Start' } },
        onDone: definition.initial,
      });
      graph.setNode('final', {
        id: 'final',
        type: 'default',
        meta: { title: { base: 'End' } },
      });
    }

    if (state.states) {
      addStates(graph, stateId, state.states);
    }
  });
}

const resolveAndSetEdge = (graph, node, onDone) => {
  const state = graph.node(onDone);

  if (state.type === 'parallel') {
    const _onDone = graph
      .children(onDone)
      .find((node) => graph.node(node).meta.position === 0);

    return resolveAndSetEdge(graph, node, _onDone);
  }

  if (state.type === 'compound') {
    const _onDone = graph
      .children(onDone)
      .find((node) => graph.node(node).meta.position === 0);

    return resolveAndSetEdge(graph, node, _onDone);
  }

  if (state.type === 'default') {
    const isGrandpaParallel =
      graph.node(graph.parent(graph.parent(state.id)))?.type === 'parallel';

    if (isGrandpaParallel) {
      graph.children(graph.parent(graph.parent(state.id))).forEach((_node) => {
        graph.setEdge(node, graph.node(_node).initial);
      });
    } else {
      graph.setEdge(node, state.id);
    }
  }
};

const setEdges = (graph) => {
  graph.nodes().forEach((node) => {
    const state = graph.node(node);

    if (state.type !== 'default') {
      return;
    }

    if (state.onDone) {
      resolveAndSetEdge(graph, node, state.onDone);
    }
  });
};

function graphToDot(graph) {
  let dot = 'digraph G {\n';

  graph.nodes().forEach((node) => {
    const state = graph.node(node);

    if (state.type !== 'default') {
      return;
    }

    const label = state.meta?.title?.base || node;
    dot += `  ${node} [label="${label}"];\n`;
  });

  graph.edges().forEach((edge) => {
    dot += `    ${edge.v} -> ${edge.w};\n`;
  });

  const fillNest = (nodes, depth) => {
    let newDot = '';

    const addRow = (text) => {
      const indent = Array(depth * 2)
        .fill(' ')
        .join('');
      newDot += `${indent}${text}\n`;
    };

    nodes.forEach((node) => {
      const state = graph.node(node);
      const parentState = graph.node(graph.parent(node));
      const isDefault = state.type === 'default';
      const isParallel = state.type === 'parallel';
      const isParallelChild = parentState?.type === 'parallel';

      if (['compound', 'parallel'].includes(state.type)) {
        addRow('subgraph {');
        addRow(`  cluster=${isParallel || isParallelChild};`);
        addRow(`  label="${isParallel ? state.meta.title.base : ''}";`);

        const children = graph.children(node);

        if (children?.length) {
          newDot += fillNest(children, depth + 1);
        }

        addRow('}');
      }

      if (isDefault && state.id) {
        addRow(state.id);
      }
    });

    return newDot;
  };

  dot += fillNest(graph.children(), 1);

  dot += '}';
  return dot;
}

export default class MainFormComponent extends Component {
  @service store;

  @tracked selectedLanguage = this.args.model.lang;
  @tracked changeset;

  constructor() {
    super(...arguments);
    const { model } = this.args;
    if (!model) return null;

    next(this, async () => {
      await model.user;

      this.changeset = new Changeset(
        this.args.model,
        lookupValidator(Validation),
        Validation,
      );

      await this.changeset.validate();

      const g = new graphlib.Graph({ compound: true });

      addStates(g, null, definition.states);
      setEdges(g);

      const dotString = graphToDot(g);

      console.log({ dotString });

      graphviz('#graph').dot(dotString).render();
    });
  }

  get langOptions() {
    const { model } = this.args;

    return [model.lang, ...model.langAlt];
  }

  @action
  onTitleChange({ target: { value } }) {
    const { model } = this.args;
    model.set(`title.${this.selectedLanguage}`, value);
  }

  @action
  onTitleChangesetChange({ target: { value } }) {
    this.changeset.set(`title.${this.selectedLanguage}`, value);
  }

  @action
  rollbackModel() {
    this.args.model.rollbackAttributes();
  }

  @action
  rollbackChangeset() {
    this.changeset.rollback();
  }

  @action
  async submit(event) {
    event.preventDefault();

    await this.args.model.save();
  }

  @action
  async submitChangeset(event) {
    event.preventDefault();

    await this.changeset.save();
  }
}
