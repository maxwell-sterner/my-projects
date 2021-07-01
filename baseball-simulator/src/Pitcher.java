
public class Pitcher {
	
	//each pitcher will have a strike out and walk rate
	
	String name;
	double THit;
	double TWalk;
	
	public Pitcher(String name, double battersfaced, double hits, double walks) {
		this.name = name;
		THit = hits/battersfaced;
		TWalk = walks/battersfaced;
	}
}
