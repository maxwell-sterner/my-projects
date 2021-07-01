import java.util.ArrayList;

public class Game{
	
	//variables to manage a game
	int inning = 1;
	int outs =0;
	ArrayList<BaseRunner> baserunners = new ArrayList<BaseRunner>();
	int homescore = 0;
	int awayscore = 0;
	
	
	public Game() {
		
	}
	
	
	public void atBat(int home, Pitcher p, Hitter h) {
		
		//Odds ratio method is used to calculate probabilities
		double LHit =0.28715; //pre-calculated league averages
		double LWalk = 0.09359;
		double PHit = p.THit * h.BHit/LHit;
		double PWalk = (p.TWalk*h.BWalk/LWalk) +PHit;
		
		double P1B = h.S;
		double P2B = P1B+h.DB;
		double P3B = P1B+P2B+h.TR;
		
		double rHit = Math.random();
		
		if(rHit < PHit) { //chance they get a hit
			//what kind of hit they get
			double rH = Math.random();
			//single
			if(rH < P1B) {
				System.out.println("Single - " + h.name);
				baserunners.add(new BaseRunner(1));
				for(int i = 0;i<baserunners.size()-1;i++) {
					BaseRunner newb = new BaseRunner(baserunners.get(i).base+1);
					baserunners.set(i, newb);
					//if a base runners value is 4, score a run for the respective team
					if(baserunners.get(i).base >= 4) {
						if(home==1) {
							homescore++;
						}
						else {
							awayscore++;
						}
						baserunners.remove(i);
						i--;
					}
					
				}
			}
			//if they hit a double
			else if(rH < P2B) {
				System.out.println("Double - " + h.name);
				baserunners.add(new BaseRunner(2));
				for(int i = 0;i<baserunners.size()-1;i++) {
					BaseRunner newb = new BaseRunner(baserunners.get(i).base+2);
					baserunners.set(i, newb);
					if(baserunners.get(i).base >= 4) {
						if(home == 1) {
							homescore++;
						}
						else {
							awayscore++;
						}
						baserunners.remove(i);
						i--;
					}
					
				}			
			}
			//triple
			else if(rH < P3B) {
				System.out.println("Triple - " + h.name);
				baserunners.add(new BaseRunner(3));
				for(int i = 0;i<baserunners.size()-1;i++) {
					BaseRunner newb = new BaseRunner(baserunners.get(i).base+3);
					baserunners.set(i, newb);
					if(baserunners.get(i).base >= 4) {
						if(home==1) {
							homescore++;
						}
						else {
							awayscore++;
						}
						baserunners.remove(i);
						i--;
					}
					
				}		
			}
			//HR
			else {
				System.out.println("Home Run - " + h.name);
				baserunners.add(new BaseRunner(4));
				for(int i = 0;i<baserunners.size();i++) {
					BaseRunner newb = new BaseRunner(baserunners.get(i).base+4);
					baserunners.set(i, newb);
					if(baserunners.get(i).base >= 4) {
						if(home==1) {
							homescore++;
						}
						else {
							awayscore++;
						}
						baserunners.remove(i);
						i--;
					}
					
				}		
			}
		}
		//walk
		else if(rHit < PWalk) {
			System.out.println("Walk - " + h.name);
			baserunners.add(new BaseRunner(1));
			for(int i = 0;i<baserunners.size()-1;i++) {
				if(baserunners.get(i).base == 1) {
					for(int j = 0;j<baserunners.size()-1;j++) {
						if(baserunners.get(i).base == 2) {
							for(int k = 0;k<baserunners.size()-1;k++) {
								if(baserunners.get(i).base == 3) {
									BaseRunner newb = new BaseRunner(baserunners.get(k).base+1);
									baserunners.set(k, newb);
								}
							}
							BaseRunner newb = new BaseRunner(baserunners.get(j).base+1);
							baserunners.set(j, newb);
						}	
					}
					BaseRunner newb = new BaseRunner(baserunners.get(i).base+1);
					baserunners.set(i, newb);
				}
				
				if(baserunners.get(i).base >= 4) {
					if(home==1) {
						homescore++;
					}
					else {
						awayscore++;
					}
					baserunners.remove(i);
					i--;
				}
				
			}		
		}
		//if out
		else {
			System.out.println("Out - " + h.name);
			outs++;
		}
	}
	
	
}