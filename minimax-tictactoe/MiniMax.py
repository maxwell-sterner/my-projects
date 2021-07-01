
def minimax(node, player, alpha, beta):
    best = None
    if node.get_children() == []:
        return node.get_util(node.mark_of(node.player1)), None
    elif node.player1 == player:
        for child in node.get_children():
            score, path = minimax(child, child.player_turn, alpha, beta)
            if score >= beta:
                return score, None
            elif score > alpha:
                alpha = score
                best = child.path
        return alpha, best
    else:
        for child in node.get_children():
            score, path = minimax(child, child.player_turn, alpha, beta)
            if score <= alpha:
                return score, None
            elif score < beta:
                beta = score
                best = child.path
        return beta, best

