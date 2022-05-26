dist:
	mkdir demucs && touch demucs.amxd && cp demucs.amxd demucs/ && cp *.js demucs/ && zip -r demucs demucs/*
clean:
	touch demucs.amxd && rm -r demucs/ && rm *.zip
