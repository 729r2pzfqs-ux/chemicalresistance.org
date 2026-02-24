#!/usr/bin/env python3
"""
Translate ALL remaining German chemical names to English using deep-translator.
"""
import json
import time
from pathlib import Path
from deep_translator import GoogleTranslator

def main():
    data_dir = Path(__file__).parent / "data"
    
    # Load chemical data
    with open(data_dir / "chemicals_burkle.json", 'r', encoding='utf-8') as f:
        chemicals = json.load(f)
    
    # Find chemicals needing translation
    needs_translation = [(i, c) for i, c in enumerate(chemicals) if not c.get('name_en')]
    
    print(f"Total chemicals: {len(chemicals)}")
    print(f"Need translation: {len(needs_translation)}")
    print(f"Already translated: {len(chemicals) - len(needs_translation)}")
    print()
    
    if not needs_translation:
        print("All chemicals already translated!")
        return
    
    translator = GoogleTranslator(source='de', target='en')
    
    # Batch translate for efficiency
    batch_size = 50
    translated_count = 0
    
    for batch_start in range(0, len(needs_translation), batch_size):
        batch = needs_translation[batch_start:batch_start + batch_size]
        
        # Get German names (just the base name, strip concentration)
        german_names = []
        for idx, chem in batch:
            # Clean name - remove concentration in parentheses, etc.
            name = chem['name'].split(',')[0].strip()
            name = name.split('(')[0].strip()
            german_names.append(name)
        
        try:
            # Translate batch
            translations = translator.translate_batch(german_names)
            
            # Apply translations
            for (idx, chem), english in zip(batch, translations):
                if english and english.strip():
                    # Capitalize properly
                    english = english.strip()
                    # Don't overwrite if same as German (translation failed)
                    if english.lower() != chem['name'].lower():
                        chemicals[idx]['name_en'] = english
                        translated_count += 1
                        print(f"✓ {chem['name']} → {english}")
                    else:
                        print(f"⚠ {chem['name']} (kept as-is)")
            
            # Small delay to avoid rate limiting
            time.sleep(0.5)
            
        except Exception as e:
            print(f"Error translating batch: {e}")
            # Try individual translations
            for idx, chem in batch:
                try:
                    name = chem['name'].split(',')[0].strip().split('(')[0].strip()
                    english = translator.translate(name)
                    if english and english.strip() and english.lower() != name.lower():
                        chemicals[idx]['name_en'] = english.strip()
                        translated_count += 1
                        print(f"✓ {chem['name']} → {english}")
                    time.sleep(0.2)
                except Exception as e2:
                    print(f"✗ {chem['name']}: {e2}")
        
        # Progress
        done = min(batch_start + batch_size, len(needs_translation))
        print(f"\n--- Progress: {done}/{len(needs_translation)} ---\n")
    
    # Save updated JSON
    with open(data_dir / "chemicals_burkle.json", 'w', encoding='utf-8') as f:
        json.dump(chemicals, f, ensure_ascii=False, indent=2)
    
    # Final stats
    final_translated = sum(1 for c in chemicals if c.get('name_en'))
    print(f"\n{'='*50}")
    print(f"Newly translated: {translated_count}")
    print(f"Total with English names: {final_translated}")
    print(f"Total chemicals: {len(chemicals)}")
    print(f"Coverage: {final_translated/len(chemicals)*100:.1f}%")

if __name__ == "__main__":
    main()
