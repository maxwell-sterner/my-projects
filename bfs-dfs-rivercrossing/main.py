from BFS import BreadthFirstSearch
from DFS import DepthFirstSearch
from NQueens import NQueensProblem
from RiverCrossing import RiverCrossingProblem

from copy import deepcopy

def main():
    # TODO: define your RiverCrossingProblem
    # left = {
    #     "farmer": 1,
    #     "wolf": 1,
    #     "goat": 1,
    #     "cabbage": 1,
    # }
    # right = {
    #     "farmer": 0,
    #     "wolf": 0,
    #     "goat": 0,
    #     "cabbage": 0,
    # }
    #
    # p1 = RiverCrossingProblem()
    # p1.set_start_state(left, right)
    # p1.set_goal_state(right, left)
    #
    # bfs = BreadthFirstSearch(p1)
    #
    # bfs.breadth_first_search()

    p1 = NQueensProblem(4)
    p1.state.place_queen(0, 0)
    p1.state.place_queen(0, 1)
    p1.state.place_queen(0, 2)
    p1.state.place_queen(0, 3)

    p2 = deepcopy(p1)
    p3 = deepcopy(p1)
    p4 = deepcopy(p1)
    print(p1.anneal())
    print(p2.anneal())
    print(p3.anneal())
    print(p4.anneal())




    # TODO: solve RiverCrossing via BFS
    # TODO: solve RiverCrossing via DFS

    # TODO: define 4-Queens
    # TODO: solve 4-Queens via DFS
    # TODO: solve 4-Queens via Simulated Annealing
    
    
if __name__ == '__main__':
    main()




