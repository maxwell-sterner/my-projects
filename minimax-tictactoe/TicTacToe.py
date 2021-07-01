from copy import deepcopy


class TicTacToeGame:

    def __init__(self, player1, player2, board=None):
        self.player1 = player1
        self.player2 = player2
        self.player_turn = self.player1
        self.marks = ['X', 'O']
        self.board = board if board else [['\'' for i in range(3)] for j in range(3)]
        self.path = [deepcopy(self)]
       # self.children = self.get_children()

    def __repr__(self):
        new = f'\n'
        print('\n')
        return f'{new.join(str(x) for x in self.board)}'

    def mark_of(self, player):
        if player == self.player1:
            return self.marks[0]
        elif player == self.player2:
            return self.marks[1]
        else:
            raise RuntimeError("player not in this game")

    def get_children(self):  # STUDENT SOLUTION
        children = []
        mark = self.mark_of(self.player_turn)
        for row in range(3):
            for col in range(3):
                if self.board[col][row] == '\'':
                    children.append(self.place_marker(mark, col, row))
        for child in children:
            if child.player_turn == self.player1:
                child.player_turn = self.player2
            else:
                child.player_turn = self.player1
        return children

    def place_marker(self, mark, col, row):
        new_state = deepcopy(self)
        if new_state.board[col][row] == '\'':
            new_state.board[col][row] = mark
            new_state.path.append(deepcopy(new_state))
            return new_state
        else:
            raise RuntimeError("Can't move there")

    def get_util(self, mark):
        return 1 if self.get_winner() == mark else -1 if self.get_winner() else 0

    def get_winner(self):
        for mark in self.marks:
            for row in range(3):
                v_count = 0
                for col in range(3):
                    # check horizontals
                    if row == 0 and self.board[col].count(mark) == 3:
                        return mark
                    # check verticals
                    elif self.board[col][row] == mark:
                        v_count += 1
                        if v_count == 3:
                            return mark

                        # check diagonals
                        l_count = 0
                        r_count = 0
                        for i in range(3):
                            for j in range(3):
                                if self.board[i][j] == mark:
                                    if i + j == col + row:
                                        l_count += 1
                                    if i - j == col - row:
                                        r_count += 1
                        if r_count == 3 or l_count == 3:
                            return mark
        return None
