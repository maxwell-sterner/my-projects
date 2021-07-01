
public class Series{
	//MAKE SURE TO UNCOMMENT THE PRINT COMMANDS IN GAME.JAVA
	// this is used as a test example for how the game simulator works
	public static void main(String[] args) {
		
		//all the pitcher and hitter statistics used
		Pitcher[] OxyPitchers = new Pitcher[4];
		OxyPitchers[0] = new Pitcher("Nolan McCarthy",363,68,26);
		OxyPitchers[1] = new Pitcher("Tom Butler",271,60,56);
		OxyPitchers[2] = new Pitcher("Diego Ramirez",275,62,16);
		OxyPitchers[3] = new Pitcher("Freshman Mike",40,8,3);
		
		Hitter[] OxyHitters = new Hitter[9];
		OxyHitters[0] = new Hitter("Reid Gibbs",196,0.369,59,27, 48,10,0);
		OxyHitters[1] = new Hitter("Antonio Andrade",179,0.277,44,17, 29,12,1);
		OxyHitters[2] = new Hitter("Jack Brancheau",190,0.335,52,31, 35,10,1);
		OxyHitters[3] = new Hitter("Michael Ingram",163,0.336,47,17, 34,10,0);
		OxyHitters[4] = new Hitter("Jake Fredrickson",173,0.336,46,33, 27,11,1);
		OxyHitters[5] = new Hitter("Angelo Zorn",145,0.214,38,22, 28,7,0);
		OxyHitters[6] = new Hitter("Eamon McNeil",136,0.291,34,19, 25,5,2);
		OxyHitters[7] = new Hitter("Bryan Smith",116,0.190,19,12, 13,3,1);
		OxyHitters[8] = new Hitter("Jared Baur",117,0.272,25,12, 18,6,0);
		
		Pitcher[] LVPitchers = new Pitcher[4];
		
		LVPitchers[0] = new Pitcher("Devon Burhans",304,77,12);
		LVPitchers[1] = new Pitcher("Cody Norman",296,80,22);
		LVPitchers[2] = new Pitcher("Christopher Peres",163,42,10);
		LVPitchers[3] = new Pitcher("Alfredo Frey",116,26,10);
		
		Hitter[] LVHitters = new Hitter[9];
		LVHitters[0] = new Hitter("Adam Cruz",190,0.338,54,24, 39,10,2);
		LVHitters[1] = new Hitter("Christopher Peres",178,0.355,55,20, 37,13,2);
		LVHitters[2] = new Hitter("Jacob Benson",172,0.295,44,20, 39,4,1);
		LVHitters[3] = new Hitter("Ryan Galan",175,0.308,45,22, 39,5,1);
		LVHitters[4] = new Hitter("Tanner Siffert",178,0.274,37,41, 28,7,2);
		LVHitters[5] = new Hitter("Christopher Ligot",164,0.323,43,24, 30,9,3);
		LVHitters[6] = new Hitter("Brandon Shiota",142,0.306,34,24, 24,9,1);
		LVHitters[7] = new Hitter("Brandon Vogel",104,0.272,22,15, 18,3,1);
		LVHitters[8] = new Hitter("Tanner Browning",93,0.416,32,13, 28,4,0);
		
		//three game series
		for(int k = 0;k<3;k++) {
			Game g = new Game();
			System.out.println("GAME " + (k+1));
			int oxy = 0; //these variables keep track of who is up in each lineup
			int lv = 0;
			int pitchChange = k; //this keeps track of who is pitching
			//nine innings
			for(int i =0;i<9; i++) {
				if(i==0) {
					System.out.println(" ");
					System.out.println("Starting for the Tigers: " + OxyPitchers[pitchChange].name);
					System.out.println("Starting for the Leopards: " + LVPitchers[pitchChange].name);
					System.out.println(" ");
				}
				//switch to closer in 7th inning
				if(i == 7) {
					pitchChange = 3;
					System.out.println(" ");
					System.out.println("Tigers put in closer " + OxyPitchers[pitchChange].name);
					System.out.println("Leopards put in closer " + LVPitchers[pitchChange].name);
					System.out.println(" ");
				}
				System.out.println("INNING " + g.inning);
				//for top and bottom of inning
				for(int j=0;j<2;j++) {
					//keep having atBats until 3 outs are achieved
					while(g.outs < 3) {
						if(j == 0) {
							g.atBat(j, OxyPitchers[pitchChange], LVHitters[lv]);
							lv++;
							if(lv>8) {
								lv=0;
							}
					}
						else {
							g.atBat(j, LVPitchers[pitchChange], OxyHitters[oxy]);
							oxy++;
							if(oxy>8) {
								oxy=0;
							}
						}
						
					}
					g.baserunners.clear();
					g.outs = 0;
					System.out.println("********************************************");
				}
				System.out.println("After inning " + g.inning+ ", the score is Oxy " + g.homescore+ " La Verne " + g.awayscore);
				g.inning++;
				//this makes sure games do not end in a tie
				if(g.inning >= 10 && g.homescore ==g.awayscore) {
					i=7;
				}
			}
			System.out.println("FINAL");
		}
		
		
		
		
	
		
		
	}
}
