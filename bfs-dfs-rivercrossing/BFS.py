from copy import deepcopy
# NOTE: python's default behavior on the assignment operator for objects and dictionaries is to make a shallow copy
# (i.e., add a pointer). This is not ideal for what we're doing here. Use deepcopy to make your life easier.


class BreadthFirstSearch:
    def __init__(self, problem):
        self.visited = []
        self.problem = deepcopy(problem)

    def breadth_first_search(self): # STUDENT SOLUTION
        self.problem.frontier.append(self.problem.start_state)
        while len(self.problem.frontier) > 0 and not self.problem.is_finished():
            self.problem.state = deepcopy(self.problem.frontier.pop(0))
            if self.problem.state.is_valid_state():
                self.problem.populate_frontier()
                for x in self.visited:
                    for y in self.problem.frontier:
                        if x == y:
                            self.problem.frontier.remove(y)
            self.visited.append(self.problem.state)
            
        return self.problem.state.path

            
           



        # TODO: loop condition: how do we know when to break out of the loop?

        # TODO: check whether we should expand the current state

        # TODO: if so, populate the frontier

        # TODO: if there is a next state in the frontier, set self.problem.state to it; otherwise, break

        # TODO: also do some bookkeeping: the new state should make it onto both self.visited and the problem's solution path

        # TODO: return solved problem


