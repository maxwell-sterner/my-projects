from copy import deepcopy
from random import randrange, shuffle, choice
from simanneal import Annealer


# NOTE: python's default behavior on the assignment operator for objects and dictionaries is to make a shallow copy
# (i.e., add a pointer). This is not ideal for what we're doing here. Use deepcopy to make your life easier.


class NQueensProblem(Annealer):

    def __init__(self, n):
        self.start_state = self.NQueensState(n)
        self.state = deepcopy(self.start_state)
        self.n = n
        self.frontier = []

    def is_finished(self):
        return self.state.is_valid_state() and self.state.queens_placed == self.n

    def next_state(self, state, row, col):
        if state.board[row][col]!='q':
            new_state = deepcopy(state)
            new_state.place_queen(row, col)
            return new_state
        else:
            raise ValueError

    def populate_frontier(self):  # STUDENT SOLUTION
        for x in range(self.n):
            for y in range(self.n):
                if self.state.board[x][y] == '0':
                    self.frontier.append(self.next_state(self.state, x, y))

    def move(self):  # STUDENT SOLUTION
        new_state = deepcopy(self.state)
        rowarr = []
        for x in new_state.queen_locations:
            for y in new_state.queen_locations[x]:
                rowarr.append(x)

        row = choice(rowarr)
        col = choice(new_state.queen_locations[row])
        i = 0
        while i == 0:
            r = randrange(0,4,1)
            c = randrange(0,4,1)
            if new_state.board[r][c] == '0':
                new_state.place_queen(r,c)
                new_state.board[row][col] = '0'
                break

        new_state.queen_locations[row].remove(col)
        if len(new_state.queen_locations[row]) == 0:
            new_state.queen_locations.pop(row)

        self.state = new_state

    def energy(self):  # STUDENT SOLUTION
        temp = 0
        row = []
        col = []
        arradd = []
        arrsub = []

        for x in self.state.queen_locations:
            for y in self.state.queen_locations[x]:
                add = x + y
                sub = x - y
                row.append(x)
                col.append(y)
                arradd.append(add)
                arrsub.append(sub)
        for x in self.state.queen_locations:
            for y in self.state.queen_locations[x]:
                add = x + y
                sub = x - y
                tempsave = temp
                for r in row:
                    if x == r:
                        temp += 1
                if temp > tempsave:
                    temp -= 1

                tempsave = temp
                for r in col:
                    if y == r:
                        temp += 1
                if temp > tempsave:
                    temp -= 1

                tempsave = temp
                for r in arradd:
                    if add == r:
                        temp += 1
                if temp > tempsave:
                    temp -= 1

                tempsave = temp
                for r in arrsub:
                    if sub == r:
                        temp += 1
                if temp > tempsave:
                    temp -= 1
        return temp

    class NQueensState():
        def __init__(self, n):
            self.n = n
            self.board = [['0' for i in range(n)] for j in range(n)]
            self.queens_placed = 0
            self.queen_locations = {}
            self.path = []

        def __repr__(self):
            new = '\n'
            return f'{new.join(str(x) for x in self.board)}'

        def is_valid_state(self):  # STUDENT SOLUTION
            if self.queens_placed != len(self.queen_locations): # same row
                return False

            arr = []
            for x in self.queen_locations:  # same column
                for y in self.queen_locations[x]:
                    if y in arr:
                        return False
                    else:
                        arr.append(y)
            arradd = []
            arrsub = []
            for x in self.queen_locations:
                for y in self.queen_locations[x]:
                    add = x + y
                    sub = x - y
                    if add in arradd:
                        return False
                    else:
                        arradd.append(add)
                    if sub in arrsub:
                        return False
                    else:
                        arrsub.append(sub)

            return True


        def place_queen(self, row, col):
            self.board[row][col] = 'q'
            self.queens_placed += 1
            if row in self.queen_locations:
                self.queen_locations[row].append(col)
            else:
                self.queen_locations[row] = [col]
            return True


