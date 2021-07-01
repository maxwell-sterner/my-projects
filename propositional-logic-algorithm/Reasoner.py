class Reasoner:

    def __init__(self, kb):
        self.kb = kb

    def forward_chain(self, query):
        true_props = self.kb.atoms
        while len(true_props) > 0:
            heads = self.kb.get_heads(true_props)
            if heads.issubset(true_props):
                break
            else:
                true_props = heads.union(true_props)

        print(true_props)
        if query in true_props:
            return True
        else:
            return False

    def backward_chain(self, query):
        props = set()
        props.add(query)
        while len(props) > 0:
            new_props = set()
            del_list = []
            for prop in props:
                new_props_list = self.kb.get_bodies(prop)
                if new_props_list != -1:
                    for p in new_props_list:
                        if len(new_props_list) > 1:
                            if len(p) > 1:
                                new_props = new_props.union(p)
                            else:
                                if p.issubset(self.kb.atoms):
                                    new_props = new_props.union(p)
                        else:
                            new_props = new_props.union(p)
                    del_list.append(prop)

            for p in del_list:
                props.remove(p)

            if new_props.issubset(props):
                break
            else:
                props = props.union(new_props)

        if props.issubset(self.kb.atoms):
            return True
        else:
            return False


class KB:

    def __init__(self):
        self.atoms = set() # set
        self.compound_props = {}  # dictionary; head: list of bodies (sets)

    def get_bodies(self, head):
        if head in self.compound_props:
            return self.compound_props[head]
        else:
            return -1

    def get_heads(self, antecedents):
        heads = set()
        for h, a_list in self.compound_props.items():
            for a in a_list:
                if a.issubset(antecedents): #if all elements of a are present in antecendents
                    heads.add(h)
                    break  # no need to add the same head multiple times
        return heads

    def add_atom(self, atom):
        self.atoms.add(atom)

    def add_compound(self, head, body):
        if head in self.compound_props:
            self.compound_props[head].append(body)
        else:
            self.compound_props[head] = [body]


if __name__ == '__main__':
    kb = KB()
    kb.add_atom("has_cat")
    kb.add_atom("plays_guitar")
    kb.add_atom("is_artist")
    kb.add_atom("no_sneeze")
    kb.add_compound("no_allergy", {"has_pet", "no_sneeze"})
    kb.add_compound("has_pet", {"has_dog"})
    kb.add_compound("has_pet", {"has_cat"})
    kb.add_compound("has_pet", {"has_gerbil"})
    kb.add_compound("allergy", {"has_pet", "sneezes"})
    kb.add_compound("allergy", {"no_pet"})
    kb.add_compound("is_musician", {"plays_guitar"})

    reasoner = Reasoner(kb)

    print(reasoner.backward_chain("no_allergy"))
    print(reasoner.forward_chain("no_allergy"))


