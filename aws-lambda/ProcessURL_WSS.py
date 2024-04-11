from bs4 import BeautifulSoup
import requests
import re
import json
import boto3

client = boto3.client("apigatewaymanagementapi", endpoint_url="https://ekew0vs61d.execute-api.eu-central-1.amazonaws.com/production")

alphabets= "([A-Za-z])"
prefixes = "(Mr|St|Mrs|Ms|Dr)[.]"
suffixes = "(Inc|Ltd|Jr|Sr|Co)"
starters = "(Mr|Mrs|Ms|Dr|Prof|Capt|Cpt|Lt|He\\s|She\\s|It\\s|They\\s|Their\\s|Our\\s|We\\s|But\\s|However\\s|That\\s|This\\s|Wherever)"
acronyms = "([A-Z][.][A-Z][.](?:[A-Z][.])?)"
websites = "[.](com|net|org|io|gov|edu|me)"
digits = "([0-9])"
multiple_dots = r'\.{2,}'

API_URL = "https://api-inference.huggingface.co/models/ugursa/FinancialBERT-Yahoo-Finance-Sentiment-Analysis"
headers = {"Authorization": "Bearer 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"}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()

def remove_author_notes(text):
    # Broaden pattern to match updates or other notes at the beginning
    text = re.sub(r'^\([^\)]+\)\s*', '', text)

    # Pattern to match author and location, updated to handle variations
    text = re.sub(r'By\s.+?\s\(.+?\)\s*[-–]\s*', '', text)

    # Pattern to match Month Day () -
    text = re.sub(r'\w{3}\s\d{1,2}\s\([^)]*\)\s*-\s*', '', text)

    # Pattern to match additional reporting or editing notes at the end, updated for flexibility
    text = re.sub(r'\(Reporting by [\w\s,]+;\s*additional reporting by [\w\s,]+;\s*Editing by [\w\s,]+\)$', '', text, flags=re.IGNORECASE)

    return text

# https://stackoverflow.com/a/31505798 (source)
def split_into_sentences(text: str) -> list[str]:
    """
    Split the text into sentences.

    If the text contains substrings "<prd>" or "<stop>", they would lead
    to incorrect splitting because they are used as markers for splitting.

    :param text: text to be split into sentences
    :type text: str

    :return: list of sentences
    :rtype: list[str]
    """
    text = " " + text + "  "
    text = text.replace("\n"," ")
    text = re.sub(prefixes,"\\1<prd>",text)
    text = re.sub(websites,"<prd>\\1",text)
    text = re.sub(digits + "[.]" + digits,"\\1<prd>\\2",text)
    text = re.sub(multiple_dots, lambda match: "<prd>" * len(match.group(0)) + "<stop>", text)
    if "Ph.D" in text: text = text.replace("Ph.D.","Ph<prd>D<prd>")
    if "No." in text: text = text.replace("No.","No<prd>")
    if "Jan." in text: text = text.replace("Jan.","Jan<prd>")
    if "Feb." in text: text = text.replace("Feb.","Feb<prd>")
    if "Mar." in text: text = text.replace("Mar.","Mar<prd>")
    if "Apr." in text: text = text.replace("Apr.","Apr<prd>")
    if "Jun." in text: text = text.replace("Jun.","Jun<prd>")
    if "Jul." in text: text = text.replace("Jul.","Jul<prd>")
    if "Aug." in text: text = text.replace("Aug.","Aug<prd>")
    if "Sep." in text: text = text.replace("Sep.","Sep<prd>")
    if "Sept." in text: text = text.replace("Sept.","Sept<prd>")
    if "Oct." in text: text = text.replace("Oct.","Oct<prd>")
    if "Nov." in text: text = text.replace("Nov.","Nov<prd>")
    if "Dec." in text: text = text.replace("Dec.","Dec<prd>")
    if "Corp." in text: text = text.replace("Corp.","Corp<prd>")
    if "Ltd." in text: text = text.replace("Ltd.","Ltd<prd>")
    if "vs." in text: text = text.replace("vs.","vs<prd>")
    if "e.g." in text: text = text.replace("e.g.","e<prd>g<prd>")
    if "i.e." in text: text = text.replace("i.e.","i<prd>e<prd>")
    if "Sen." in text: text = text.replace("Sen.","Sen<prd>")
    if "Calif." in text: text = text.replace("Calif.","Calif<prd>")
    if "Gov." in text: text = text.replace("Gov.","Gov<prd>")
    text = re.sub("\\s" + alphabets + "[.] "," \\1<prd> ",text)
    text = re.sub(acronyms+" "+starters,"\\1<stop> \\2",text)
    text = re.sub(alphabets + "[.]" + alphabets + "[.]" + alphabets + "[.]","\\1<prd>\\2<prd>\\3<prd>",text)
    text = re.sub(alphabets + "[.]" + alphabets + "[.]","\\1<prd>\\2<prd>",text)
    text = re.sub(" "+suffixes+"[.] "+starters," \\1<stop> \\2",text)
    text = re.sub(" "+suffixes+"[.]"," \\1<prd>",text)
    text = re.sub(" " + alphabets + "[.]"," \\1<prd>",text)
    if "”" in text: text = text.replace(".”","”.")
    if "\"" in text: text = text.replace(".\"","\".")
    if "!" in text: text = text.replace("!\"","\"!")
    if "?" in text: text = text.replace("?\"","\"?")
    text = text.replace(".",".<stop>")
    text = text.replace("?","?<stop>")
    text = text.replace("!","!<stop>")
    text = text.replace("<prd>",".")
    text = text.replace('<ellipsis>', '...')
    text = text.replace('<qst>', '?')
    text = text.replace('<exc>', '!')
    sentences = text.split("<stop>")
    sentences = [s.strip() for s in sentences]
    if sentences and not sentences[-1]: sentences = sentences[:-1]
    return sentences

def remove_parenthetical_sentences(sentences):
    cleaned_sentences = []
    for sentence in sentences:
        # Check if the entire sentence is within parentheses
        if sentence.startswith('(') and sentence.endswith(')'):
            continue  # Skip this sentence
        cleaned_sentences.append(sentence)
    return cleaned_sentences

def merge_parenthetical_statements(text):
    # Replace periods within parentheses with a placeholder
    text = re.sub(r'\(([^)]+)\)', lambda m: "(" + m.group(1).replace('.', '<prd>') + ")", text)
    return text

def replace_ellipses(text):
    # Replace '...' with a placeholder
    return re.sub(r'\.\.\.', '<ellipsis>', text)

def replace_sentence_stops_in_quotes(text):
    # Define a function to replace sentence stops within a matched quote
    def replace_stops(match):
        # Replace all periods, question marks, and exclamation marks in the matched quote
        temp = match.group(0).replace('.', '<prd>')
        temp = temp.replace('?', '<qst>')
        temp = temp.replace('!', '<exc>')
        return temp

    # Regex-Muster, das Text in Anführungszeichen erfasst
    quote_pattern = r'["“”](.*?)["“”]'

    # ersetzte alle Satzzeichen in Anführungszeichen
    text = re.sub(quote_pattern, replace_stops, text, flags=re.UNICODE)

    return text

def get_text_from_url(url):
    res = requests.get(url)

    soup = BeautifulSoup(res.text, "html.parser")

    title = soup.find("title").text

    if(soup == None or title == 'Yahoo'):
        return "Error"

    # print(title)

    soup = soup.find("div", attrs={'class':'caas-body'})

    for div in soup.find_all('div'):
        div.unwrap()

    for ul in soup.find_all('ul'):
        # Finde das unmittelbar vorhergehende <p>-Tag, wenn vorhanden
        p_tag = ul.find_previous_sibling('p')

        # Wenn ein <p>-Tag gefunden wurde, entferne es
        if p_tag:
            p_tag.decompose()

    # Entferne alle <div>-Elemente
    for ul in soup.find_all("ul"):
        ul.decompose()

    for button in soup.find_all("button"):
        button.decompose()

    for p_tag in soup.find_all('p', string="©2024 Bloomberg L.P."):
        p_tag.decompose()

    # Dein Text
    text = ""

    for p in soup.find_all('p'):
        text = text + p.text + "\n"

    return text

def calculate_weighted_sentiment(sentences, sentiments):
    total_weight = 0
    weighted_sentiment_sum = 0

    for sentence, sentiment in zip(sentences, sentiments):
        # Gewicht ist hier die Anzahl der Wörter im Satz
        weight = len(sentence.split())

        weighted_sentiment_sum += sentiment * weight
        total_weight += weight

    # Berechnung des gewichteten Durchschnitts
    if total_weight > 0:
        weighted_average = weighted_sentiment_sum / total_weight
    else:
        weighted_average = 0

    return weighted_average

def lambda_handler(event, context):
    
    data = json.loads(event.get("body"))
    url = data.get("data")
    
    connectionId = event["requestContext"]["connectionId"]
    
    # response = client.post_to_connection(ConnectionId=connectionId, Data=json.dumps(responseMessage).encode("utf-8"))
    
    
    if not url:
        response = client.post_to_connection(ConnectionId=connectionId, Data=json.dumps({'message': 'URL parameter is missing'}).encode("utf-8"))
    
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('processed_urls')
    
    responseFromDB = table.get_item(Key={'processId': url})
    
    if "Item" in responseFromDB:
        result = responseFromDB["Item"]["result"]
        response = client.post_to_connection(ConnectionId=connectionId, Data=json.dumps({'message': 'This URL has already been processed', 'redirect': url}).encode("utf-8"))
        return { "statusCode": 200 }
        
    
    # Annahme: Die query-Funktion gibt das Ergebnis direkt zurück und wirft bei Fehlern eine Exception.
    result = query({"inputs": "Of Course I Still Love You."})
    
    if 'error' in result:
        if "Rate limit reached" in result['error']:
            response = client.post_to_connection(ConnectionId=connectionId, Data=json.dumps({'error': 'Rate limit reached', 'status': 'failed', 'url': url}).encode("utf-8"))
            return { "statusCode": 200 }
        elif "Model" in result['error']:
            response = client.post_to_connection(ConnectionId=connectionId,
            Data=json.dumps({'error': 'Model ugursa/FinancialBERT-Yahoo-Finance-Sentiment-Analysis is currently loading.', 'status': 'failed', 'url': url, 'estimated_time': 20.0}).encode("utf-8"))
            return { "statusCode": 200 }
        else:
            response = client.post_to_connection(ConnectionId=connectionId, Data=json.dumps({'error': 'An unexpected error occurred', 'status': 'failed', 'url': url}).encode("utf-8"))
            return { "statusCode": 200 }
            
    
    text = get_text_from_url(url)
    
    if(text == "Error"):
        response = client.post_to_connection(ConnectionId=connectionId, Data=json.dumps({'error': 'Yahoo returned an Error. Please try again later.', 'status': 'failed', 'url': url}).encode("utf-8"))
        return { "statusCode": 200 }

    split_text = split_into_sentences(merge_parenthetical_statements(replace_ellipses(replace_sentence_stops_in_quotes(text))))
    cleaned_sentences = remove_parenthetical_sentences(split_text)

    sentences = []
    sentences_with_result = []
    sentiments = []

    for sentence in cleaned_sentences:
        sentence = remove_author_notes(sentence)
        sentences.append(sentence)
        
    response = client.post_to_connection(ConnectionId=connectionId, Data=json.dumps({'url': url, 'status': 'pending', 'estimated_time': len(sentences)}).encode("utf-8"))

    total_score_bullish, total_score_bearish, total_score_neutral = 0, 0, 0
    amount_bullish, amount_bearish, amount_neutral = 0, 0, 0
    avg_score_bullish, avg_score_bearish, avg_score_neutral = 0, 0, 0

    for sentence in sentences:
        if "Error" in sentence:
            response = client.post_to_connection(ConnectionId=connectionId, Data=json.dumps({'url': url, 'status': 'failed', 'error': 'Something went wrong with BS4'}).encode("utf-8"))
            return { "statusCode": 200 }
            
        try:
            result = query({"inputs": sentence})[0][0]
        except:
            response = client.post_to_connection(ConnectionId=connectionId, Data=json.dumps({'url': url, 'status': 'failed', 'error': 'Something went wrong with huggingface'}).encode("utf-8"))
            return { "statusCode": 200 }
        
        label = result["label"]
        score = result["score"]

        # Anpassen des Sentiments basierend auf dem Label
        if label == 'bullish':
            sentiment_value = score
            total_score_bullish += score
            amount_bullish += 1
        elif label == 'bearish':
            sentiment_value = -score
            total_score_bearish += score
            amount_bearish += 1
        else:  # Neutral
            sentiment_value = 0  # Neutral als 0 behandeln
            total_score_neutral += score
            amount_neutral += 1

        sentiments.append(sentiment_value)
        
        sentences_with_result.append({
            "sentence": sentence,
            "result": result
        })
    
    # Berechnung des gewichteten Sentiments
    weighted_sentiment = calculate_weighted_sentiment(sentences, sentiments)

    # Berechnung des durchschnittlichen Sentiments
    avg_score_bullish = 0 if amount_bullish == 0 else total_score_bullish / amount_bullish
    avg_score_bearish = 0 if amount_bearish == 0 else total_score_bearish / amount_bearish
    avg_score_neutral = 0 if amount_neutral == 0 else total_score_neutral / amount_neutral

    overall_sentiment = ""

    if weighted_sentiment >= (-1) and weighted_sentiment <= (-0.6):
        overall_sentiment = "Bearish"
    elif weighted_sentiment > (-0.6) and weighted_sentiment <= (-0.2):
        overall_sentiment = "Slightly Bearish"
    elif weighted_sentiment > (-0.2) and weighted_sentiment <= (0.2):
        overall_sentiment = "Neutral"
    elif weighted_sentiment > (0.2) and weighted_sentiment <= (0.6):
        overall_sentiment = "Slightly Bullish"
    elif weighted_sentiment > (0.6) and weighted_sentiment <= (1):
        overall_sentiment = "Bullish"

    result = {
        "sentences": sentences_with_result,
        "Average Score Bullish": avg_score_bullish,
        "Average Score Neutral": avg_score_neutral,
        "Average Score Bearish": avg_score_bearish,
        "Amount Bullish": amount_bullish,
        "Amount Neutral": amount_neutral,
        "Amount Bearish": amount_bearish,
        "Weighted Sentiment": weighted_sentiment,
        "Overall Sentiment": overall_sentiment
    }

    json_data = json.dumps(result)
    
    table.put_item(Item={'processId': url, 'result': json_data})
    
    response = client.post_to_connection(ConnectionId=connectionId, Data=json.dumps({'url': url, 'status': 'completed'}).encode("utf-8"))
    
    return { "statusCode": 200 }