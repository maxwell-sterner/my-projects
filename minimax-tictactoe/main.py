from TicTacToe import TicTacToeGame
from MiniMax import minimax

if __name__ == '__main__':
    board1 = [['\'', 'X', '\''], ['X', 'O', 'O'], ['\'', 'O', 'X']]
    board2 = [['\'', 'X', '\''], ['X', 'X', 'O'], ['\'', 'O', 'O']]
    board3 = [['\'', 'X', '\''], ['X', '\'', 'O'], ['\'', 'O', '\'']]
    board4 = None
    game = TicTacToeGame("X", "O", board4)

    turn = True
    while game.get_winner() is None and len(game.get_children()) != 0:
        if turn:
            util, game.path = minimax(game, "X", float('-inf'), float('inf'))
            game.board = game.path[1].board
            game.player_turn = "O"
            turn = not turn
        else:
            util, game.path = minimax(game, "O", float('-inf'), float('inf'))
            game.board = game.path[1].board
            game.player_turn = "X"
            turn = not turn

    print(game.path[1])
    # Test leaf nodes

    # Test MAX if block

    # Test MIN if block

    # Test full MiniMax