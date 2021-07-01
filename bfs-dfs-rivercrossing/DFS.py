from copy import deepcopy


# NOTE: python's default behavior on the assignment operator for objects and dictionaries is to make a shallow copy
# (i.e., add a pointer). This is not ideal for what we're doing here. Use deepcopy to make your life easier.

class DepthFirstSearch:
    def __init__(self, problem):
        self.visited = []
        self.problem = deepcopy(problem)

    def depth_first_search(self):
        self.problem.frontier.append(self.problem.start_state)
        while len(self.problem.frontier) > 0 and not self.problem.is_finished():
            self.problem.state = deepcopy(self.problem.frontier.pop(len(self.problem.frontier)-1))
            if self.problem.state.is_valid_state():
                self.problem.populate_frontier()
                for x in self.visited:
                    for y in self.problem.frontier:
                        if x == y:
                            self.problem.frontier.remove(y)
            self.visited.append(self.problem.state)

        return self.problem.state

#TODO: DFS is very similar to BFS; what are the main difference(s)?

# TODO: return solved probem
